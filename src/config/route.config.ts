export const RouteConfig = {
  ROOT: "/",
  POINT_HISTORY: "/point-history",

  AUTH: {
    LOGIN: "/auth/login",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },
  PRIVILEGE: {
    LIST: "/privilege",
    HISTORY: "/privilege/history",
    VOUCHER_DETAIL: (id: string) => `/privilege/voucher/${id}`,
  },
  PRODUCT: {
    LIST: "/product",
    HISTORY: "/product/history",
  },
  SCAN_ITEMS: {
    LIST: "/scan-items",
    HISTORY: "/scan-items/history",
  },
  PROFILE: {
    PROFILE: "/profile",
    CHANGE_PASSWORD: "/profile/change-password",
    LANGUAGE: "/profile/language",
    CONSENT: "/profile/consent",
  },
};

