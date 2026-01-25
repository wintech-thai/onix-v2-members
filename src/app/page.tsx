import { COOKIE_NAMES } from "@/config/auth.config";
import { RouteConfig } from "@/config/route.config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const RootPage = async () => {
  const cookieStore = await cookies();

  const orgId = cookieStore.get(COOKIE_NAMES.ORG_ID);

  if (!orgId?.value) {
    throw new Error("ORG NOT FOUND");
  }

  redirect(RouteConfig.ROOT(orgId.value));
};

export default RootPage;
