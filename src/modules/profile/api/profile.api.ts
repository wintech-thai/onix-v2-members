import { createMutationService, createQueryService } from "@/lib/api-factory";

export interface GetCustomerUserInfoResponse {
  status: string;
  message: string;
  user: IUserInfo;
}

export interface IUserInfo {
  userId: string;
  userName: string;
  userEmail: string;
  name: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  secondaryEmail: string | null;
  phoneNumberVerified: string | null;
  secondaryEmailVerified: string | null;
  birthDate: string | null;
  isOrgInitialUser: string | null;
  userCreatedDate: string | null;
}

export interface GetCustomerUserInfoParams {
  orgId: string;
}

export const getCustomerUserInfoService = createQueryService<
  GetCustomerUserInfoResponse,
  null,
  GetCustomerUserInfoParams
>({
  key: ["get-customer-user-info"],
  url: (params) =>
    `/customer-api/OnlyCustomerUser/org/${params.orgId}/action/GetUserInfo`,
  method: "get",
});

export interface UpdateCustomerUserInfoResponse {
  status: string;
  description: string;
}

export interface UpdateCustomerUserInfoRequest {
  Name: string;
  LastName: string;
  PhoneNumber: string | null;
  SecondaryEmail: string | null;
}

export interface UpdateCustomerUserInfoParams {
  orgId: string;
}

export const updateCustomerUserInfoService = createMutationService<
  UpdateCustomerUserInfoResponse,
  UpdateCustomerUserInfoRequest,
  UpdateCustomerUserInfoParams
>({
  apiName: "UpdateUserInfo",
  url: (params) =>
    `/customer-api/OnlyCustomerUser/org/${params.orgId}/action/UpdateUserInfo`,
  method: "post",
});

export interface UpdateUserPasswordResponse {
  status: string;
  description: string;
}

export interface UpdateUserPasswordRequest {
  CurrentPassword: string;
  NewPassword: string;
}

export interface UpdateUserPasswordParams {
  orgId: string;
}

export const updateUserPasswordService = createMutationService<
  UpdateUserPasswordResponse,
  UpdateUserPasswordRequest,
  UpdateUserPasswordParams
>({
  apiName: "UpdatePassword",
  url: (params) =>
    `/customer-api/OnlyCustomerUser/org/${params.orgId}/action/UpdatePassword`,
  method: "post",
});

export interface LogoutUserResponse {
  status: string;
  message: string;
}

export interface LogoutUserParams {
  orgId: string;
}

export const logoutUserService = createMutationService<
  LogoutUserResponse,
  null,
  LogoutUserParams
>({
  apiName: "Logout",
  url: (params) =>
    `/customer-api/OnlyCustomerUser/org/${params.orgId}/action/Logout`,
  method: "post",
});
