import { createMutationHook, createQueryHook } from "@/lib/hooks-factory";
import { getCustomerUserInfoService, logoutUserService, updateCustomerUserInfoService, updateUserPasswordService } from "../api/profile.api";

export const getCustomerUserInfoQuery = createQueryHook(getCustomerUserInfoService);

export const updateUserInfoMutation = createMutationHook(updateCustomerUserInfoService);

export const updatePasswordMutation = createMutationHook(updateUserPasswordService);

export const logoutUserMutation = createMutationHook(logoutUserService);



