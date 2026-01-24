import { createMutationService } from "@/lib/api-factory";

export interface CustomerLoginResponse {
  status: string;
  message: string;
}

export interface CustomerLoginRequest {
  orgId: string;
  userName: string;
  password: string;
}

export const customerLoginService = createMutationService<
  CustomerLoginResponse,
  CustomerLoginRequest,
  null
>({
  apiName: "customerLogin",
  url: "/api/auth/login",
  method: "post",
  proxy: true,
});
