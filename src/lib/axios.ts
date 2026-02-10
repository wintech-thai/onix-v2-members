/* eslint-disable  @typescript-eslint/no-explicit-any */

import axios from "axios";
import { env } from "next-runtime-env";
import Cookies from "js-cookie";
import { COOKIE_NAMES } from "@/config/auth.config";

export const apiClient = axios.create({
  baseURL: env("NEXT_PUBLIC_API_URL"),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// origin เดียวกัน ไม่ต้อง withCredentials ก็ได้
export const api = axios.create({
  baseURL: "/api/bff",
  withCredentials: true,
});

// แนะนำให้ใส่ default header นี้กับ “write methods” เพื่อผ่าน CSRF check ที่ BFF
api.interceptors.request.use((config) => {
  if (config.method && ["post", "put", "patch", "delete"].includes(config.method)) {
    config.headers = config.headers ?? {};
    (config.headers as any)["x-requested-with"] = "XMLHttpRequest";
  }
  return config;
});

// Track ongoing refresh to prevent race condition
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

function processQueue(error: any = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
}

async function refreshToken(): Promise<void> {
  const orgId = Cookies.get(COOKIE_NAMES.ORG_ID);

  if (!orgId) {
    throw new Error("No orgId found in URL");
  }

  // เรียก refresh endpoint ที่ backend พร้อมส่ง orgId
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orgId }),
  });

  if (!response.ok) {
    throw new Error("Refresh token failed");
  }
}

// axios response interceptor with refresh logic
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    const status = err?.response?.status;
    const orgId = Cookies.get(COOKIE_NAMES.ORG_ID);

    // ถ้าเป็น 401 และยังไม่เคย retry
    if (status === 401 && !originalRequest._retry) {
      // ถ้ามีการ refresh อยู่แล้ว ให้ queue ไว้รอ
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh token ที่ client
        await refreshToken();
        isRefreshing = false;
        processQueue(null);

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError);

        // Save current URL so user returns here after login
        sessionStorage.setItem("returnUrl", window.location.pathname + window.location.search);

        if (!orgId) {
          window.location.href = '/';
        } else {
          window.location.href = `/${orgId}/auth/sign-in`;
        }
        // Don't reject — let the page redirect without triggering error UI
        return new Promise(() => {});
      }
    } else if (status === 401 && originalRequest._retry) {
      // 401 again after retry -> force logout

      // Save current URL so user returns here after login
      sessionStorage.setItem("returnUrl", window.location.pathname + window.location.search);

      if (!orgId) {
        window.location.href = "/";
      } else {
        window.location.href = `/${orgId}/auth/sign-in`;
      }
      // Don't reject — let the page redirect without triggering error UI
      return new Promise(() => {});
    }

    // กรณีอื่นๆ ที่ไม่ใช่ 401
    return Promise.reject(err);
  }
);

