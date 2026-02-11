import { createMutationHook, createQueryHook } from "@/lib/hooks-factory";
import * as service from "../api/privilege.api";

// NOTE: redeemable privileges
export const useGetRedeemablePrivileges = createQueryHook(
  service.getRedeemablePrivilegesApi
);

// NOTE: voucher
export const useGetVoucher = createQueryHook(service.getVoucherByIdApi);

export const useGetVouchers = createQueryHook(service.getVouchersApi);

export const useGetVoucherCount = createQueryHook(service.getVouchersCountApi);

export const useGetVoucherById = createQueryHook(service.getVoucherByIdApi);

export const useGetVoucherVerifyQrUrl = createMutationHook(
  service.getVoucherVerifyQrUrlApi
);

export const useRedeemPrivilegesById = createMutationHook(
  service.redeeemPrivilegesByIdApi,
);
