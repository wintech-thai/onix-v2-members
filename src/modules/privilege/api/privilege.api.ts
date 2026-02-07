/* eslint-disable @typescript-eslint/no-empty-object-type */
import { createMutationService, createQueryService } from "@/lib/api-factory";

interface BaseParams {
  orgId: string;
}

export interface GetRedeemablePrivilegesParams extends BaseParams {}

export interface GetRedeemablePrivilegesResponse extends IPrivilege {}

export interface GetRedeemablePrivilegesRequest {
  fullTextSearch?: string;
  itemType?: number;
  privilegeId?: string;
  offset?: number;
  limit?: number;
  fromDate?: string;
  toDate?: string;
  status?: string;
}

export interface IPrivilege {
  id: string;
  orgId: string;
  code: string;
  description: string;
  tags: string;
  itemType: number;
  narrative: string;
  content: string;
  properties: string;
  propertiesObj: null;
  narratives: string[];
  effectiveDate: string;
  expireDate: string;
  status: string;
  currentBalance: number;
  pointRedeem: number;
  images: string[];
  createdDate: string;
  updatedDate: string;
}

export const getRedeemablePrivilegesApi = createQueryService<
  GetRedeemablePrivilegesResponse[],
  GetRedeemablePrivilegesRequest,
  GetRedeemablePrivilegesParams
>({
  key: ["redeemable-privileges"],
  url: (params) =>
    `/customer-api/CustomerPrivilege/org/${params.orgId}/action/GetRedeemablePrivileges`,
  method: "post",
});

export interface IVoucher {
  id: string;
  orgId: string;
  voucherNo: string;
  description: string | null;
  customerId: string;
  walletId: string;
  privilegeId: string;
  tags: string | null;
  startDate: string;
  endDate: string;
  redeemPrice: number;
  status: string;
  isUsed: string;
  voucherParams: string;
  pin: string;
  barcode: string;
  usedDate: string | null;
  createdDate: string;
  updatedDate: string;
  customerCode: string;
  customerName: string;
  customerEmail: string;
  privilegeCode: string;
  privilegeName: string;
  privilegeTermAndCondition: string;
  voucherVerifyUrl: string | null;
}

export interface GetVouchersRequest {
  offset?: number;
  fromDate?: string;
  limit?: number;
  toDate?: string;
  fullTextSearch?: string;
  customerId?: string;
}

export interface GetVouchersResponse extends IVoucher {}

export interface GetVouchersParams extends BaseParams {}

export const getVouchersApi = createQueryService<
  GetVouchersResponse[],
  GetVouchersRequest,
  GetVouchersParams
>({
  key: ["get-voucher"],
  url: (params) =>
    `/customer-api/CustomerPrivilege/org/${params.orgId}/action/GetVouchers`,
  method: "post",
});

export const getVouchersCountApi = createQueryService<
  number,
  GetVouchersRequest,
  GetVouchersParams
>({
  key: ["get-voucher", "count"],
  url: (params) =>
    `/customer-api/CustomerPrivilege/org/${params.orgId}/action/GetVoucherCount`,
  method: "post",
});

export interface GetVoucherVerifyQrUrlResponse {
  status: string;
  description: string;
  voucher: IVoucher;
}

export interface GetVoucherVerifyQrUrlParams extends BaseParams {
  voucherId: string;
}

export const getVoucherVerifyQrUrlApi = createMutationService<
  GetVoucherVerifyQrUrlResponse,
  null,
  GetVoucherVerifyQrUrlParams
>({
  apiName: "GetVoucherVerifyQrUrl",
  url: (params) =>
    `/customer-api/CustomerPrivilege/org/${params.orgId}/action/GetVoucherVerifyQrUrl/${params.voucherId}`,
  method: "get",
});

export interface GetVoucherByIdResponse {
  status: string;
  description: string;
  voucher: IVoucher;
}

export interface GetVoucherByIdParams extends BaseParams {
  voucherId: string;
}

export const getVoucherByIdApi = createQueryService<
  GetVoucherByIdResponse,
  null,
  GetVoucherByIdParams
>({
  key: ["get-voucher-by-id"],
  url: (params) =>
    `/customer-api/CustomerPrivilege/org/${params.orgId}/action/GetVoucherById/${params.voucherId}`,
  method: "get",
});

export interface RedeemPrivilegesByIdResponse {
  status: string;
  description: string;
  voucher: IVoucher;
}

export interface RedeemPrivilegesByIdParams extends BaseParams {
  privilegeId: string;
}

export const redeeemPrivilegesByIdApi = createMutationService<
  RedeemPrivilegesByIdResponse,
  null,
  RedeemPrivilegesByIdParams
>({
  apiName: "RedeemPrivilegesById",
  url: (params) =>
    `/customer-api/CustomerPrivilege/org/${params.orgId}/action/RedeemPrivilegeById/${params.privilegeId}`,
  method: "post",
})

