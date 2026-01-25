export const RouteConfig = {
  ROOT: (orgId: string) => `/${orgId}/point`,
  POINT_HISTORY: (orgId: string) => `/${orgId}/point/point-history`,

  AUTH: {
    LOGIN: "/auth/login",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },
  PRIVILEGE: {
    LIST: (orgId: string) => `/${orgId}/privilege`,
    HISTORY: (orgId: string) => `/${orgId}/privilege/history`,
    VOUCHER_DETAIL: (orgId: string, id: string) => `/${orgId}/privilege/voucher/${id}`,
  },
  PRODUCT: {
    LIST: (orgId: string) => `/${orgId}/product`,
    HISTORY: (orgId: string) => `/${orgId}/product/history`,
  },
  SCAN_ITEMS: {
    LIST: (orgId: string) => `/${orgId}/scan-items`,
    HISTORY: (orgId: string) => `/${orgId}/scan-items/history`,
  },
  PROFILE: {
    PROFILE: (orgId: string) => `/${orgId}/profile`,
    CHANGE_PASSWORD: (orgId: string) => `/${orgId}/profile/change-password`,
    LANGUAGE: (orgId: string) => `/${orgId}/profile/language`,
    CONSENT: (orgId: string) => `/${orgId}/profile/consent`,
  },
};
