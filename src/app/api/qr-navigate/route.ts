import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAMES } from "@/config/auth.config";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { success: false, message: "Missing url parameter" },
      { status: 400 }
    );
  }

  // Validate URL to prevent open redirect vulnerabilities
  // For now, we allow http/https, but in prod we might want strict allow-listing
  try {
    const urlObj = new URL(targetUrl);
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      throw new Error("Invalid protocol");
    }
  } catch (e) {
    return NextResponse.json(
      { success: false, message: "Invalid URL provided" },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  // Append ?member=true to the target URL
  const separator = targetUrl.includes("?") ? "&" : "?";
  const finalUrl = `${targetUrl}${separator}member=true`;

  if (accessToken) {
    try {
      let response = await fetch(finalUrl, {
        method: "GET",
        headers: {
          PsMemberToken: accessToken,
        },
        redirect: "manual",
      });

      // Handle 403: Try to Refresh Token
      if (response.status === 403) {
        console.log("Token expired (403), attempting refresh...");
        const rt = cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;
        const orgId = searchParams.get("org") || cookieStore.get(COOKIE_NAMES.ORG_ID)?.value;

        if (rt && orgId) {
          try {
             // Call backend refresh
             const refreshRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/customer-api/AuthCustomer/org/${orgId}/action/Refresh`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken: rt }),
                cache: "no-store",
              }
            );

            if (refreshRes.ok) {
              const data = await refreshRes.json();
              const newAt = data?.token?.access_token;
              const newRt = data?.token?.refresh_token;
              const expiresIn = data?.token?.expires_in;

              if (newAt) {
                 // Update cookies
                 const now = Date.now();
                 // Note: We cannot import COOKIE_OPTIONS easily if it's not exported or if we want to be safe,
                 // we manually set secure/httpOnly here to match auth.config
                 cookieStore.set({
                    name: COOKIE_NAMES.ACCESS_TOKEN,
                    value: newAt,
                    path: "/",
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    expires: new Date(now + (expiresIn || 14 * 60) * 1000),
                 });

                 if (newRt) {
                    cookieStore.set({
                        name: COOKIE_NAMES.REFRESH_TOKEN,
                        value: newRt,
                        path: "/",
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict",
                        maxAge: 60 * 24 * 60 * 60, // 60 days
                    });
                 }

                 // Retry the original request with new token
                 response = await fetch(finalUrl, {
                    method: "GET",
                    headers: {
                      PsMemberToken: newAt,
                    },
                    redirect: "manual",
                 });
              }
            } else {
               console.error("Refresh failed during proxy", refreshRes.status);
            }
          } catch (refreshErr) {
            console.error("Error during proxy refresh", refreshErr);
          }
        }
      }

      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location");
        console.log("location", location);
        if (location) {
          try {
            // Ensure absolute URL validation
            new URL(location);
            return NextResponse.redirect(location);
          } catch {
            // Handle relative redirect location
            const resolvedUrl = new URL(location, finalUrl).toString();
            return NextResponse.redirect(resolvedUrl);
          }
        }
      }

      // If 200 OK (no redirect), we fall back to finalUrl.
      // Ideally, the validation server *should* have redirected.
    } catch (error) {
      console.error("Failed to send audit request for QR scan", error);
    }
  }

  return NextResponse.redirect(finalUrl);
}
