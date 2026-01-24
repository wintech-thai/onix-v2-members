/* eslint-disable  @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {
  COOKIE_NAMES,
  COOKIE_OPTIONS,
  TOKEN_EXPIRY,
} from "@/config/auth.config";
import { apiClient } from "@/lib/axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const cookiesStore = await cookies();

    const r = await apiClient.post(`customer-api/AuthCustomer/org/${body.orgId}/action/Login`, {
      userName: body.userName,
      password: body.password,
    });

    if (r.status !== 200) {
      return NextResponse.json({
        success: false,
        message: r.data,
      });
    }

    const accessToken = r.data.token.access_token;
    const refreshToken = r.data.token.refresh_token;
    const expiresIn = r.data.token.expires_in; // in seconds
    const decodedToken = jwt.decode(accessToken) as {
      [key: string]: any;
    } | null;
    const now = Date.now();

    // Set user_name cookie
    cookiesStore.set({
      name: COOKIE_NAMES.USER_NAME,
      value: decodedToken?.preferred_username,
      httpOnly: false,
      secure: COOKIE_OPTIONS.secure,
      sameSite: COOKIE_OPTIONS.sameSite,
    });

    // Set access_token cookie (use expires_in from API)
    cookiesStore.set({
      name: COOKIE_NAMES.ACCESS_TOKEN,
      value: accessToken,
      ...COOKIE_OPTIONS,
      expires: new Date(now + expiresIn * 1000), // convert seconds to milliseconds
    });

    // Set refresh_token cookie (60 days)
    cookiesStore.set({
      name: COOKIE_NAMES.REFRESH_TOKEN,
      value: String(refreshToken),
      ...COOKIE_OPTIONS,
      maxAge: TOKEN_EXPIRY.REFRESH_TOKEN_SECONDS,
    });

    // Set org_id cookie (never expires - 10 years)
    cookiesStore.set({
      name: COOKIE_NAMES.ORG_ID,
      value: body.orgId,
      httpOnly: false, // Allow client-side access if needed
      secure: COOKIE_OPTIONS.secure,
      sameSite: COOKIE_OPTIONS.sameSite,
      path: "/",
      maxAge: 1 * 365 * 24 * 60 * 60, // 1 years in seconds
    });

    return NextResponse.json({
      success: true,
      message: "success",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.response?.data?.message || error.message || "Authentication failed",
        details: error.response?.data,
      },
      { status: error.response?.status || 500 }
    );
  }
}
