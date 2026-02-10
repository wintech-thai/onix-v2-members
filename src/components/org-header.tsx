"use client";

import { Building2 } from "lucide-react";
import { useParams } from "next/navigation";
import { getOrganizationQuery } from "@/modules/organize/hooks/organize-api.hooks";
import { Skeleton } from "@/components/ui/skeleton";
import Cookies from "js-cookie";
import { COOKIE_NAMES } from "@/config/auth.config";

export const OrgHeader = () => {
  const params = useParams<{ orgId: string }>();
  const getOrganization = getOrganizationQuery(
    {
      orgId: params.orgId,
    },
    undefined,
    {
      throwOnError: false,
    }
  );

  const ORGNAME = Cookies.get(COOKIE_NAMES.ORG_ID);

  const organization = getOrganization.data?.data;

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b">
      <div className="mx-auto max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
        <div className="flex items-center justify-between py-3 px-4">
          {/* Organization Info */}
          <div className="flex items-center gap-3">
            {getOrganization.isLoading ? (
              <>
                <Skeleton className="h-11 w-11 rounded-xl" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </>
            ) : getOrganization.isError || !organization ? (
              <>
                {/* Fallback when API fails — show org name from cookie */}
                <div className="relative h-11 w-11 rounded-lg bg-linear-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center shadow-sm overflow-hidden">
                  <Building2
                    className="h-5 w-5 text-primary relative z-10"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold text-sm leading-tight text-foreground">
                    {ORGNAME || "Organization"}
                  </h2>
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-muted-foreground">
                      Powered by{" "}
                      <span className="font-semibold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        Please-Scan
                      </span>
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Logo with gradient */}
                <div className="relative h-11 w-11 rounded-lg bg-linear-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center shadow-sm overflow-hidden">
                  <div className="absolute inset-0 rounded-lg bg-linear-to-br from-primary/10 to-transparent" />
                  {organization?.logoImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={organization.logoImageUrl}
                      alt={organization.orgName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Building2
                      className="h-5 w-5 text-primary relative z-10"
                      strokeWidth={2.5}
                    />
                  )}
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                  <h2 className="font-bold text-sm leading-tight text-foreground">
                    {organization?.orgName || ORGNAME}
                  </h2>
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-muted-foreground">
                      Powered by{" "}
                      <span className="font-semibold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        Please-Scan
                      </span>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
