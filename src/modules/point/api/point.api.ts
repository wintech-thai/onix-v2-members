import { createQueryService } from "@/lib/api-factory";

export interface GetWalletResponse {
  success: string;
  description: string;
  wallet: IWallet;
}

export interface IWallet {
  id: string;
  orgId: string;
  name: string;
  tags: string;
  description: string;
  customerId: string;
  pointBalance: number | null;
  createdDate: string;
  updatedDate: string | null;
}

export interface GetWalletParams {
  orgId: string;
}

export const getWalletService = createQueryService<
  GetWalletResponse,
  null,
  GetWalletParams
>({
  key: ["getWallet"],
  url: (params) => {
    return `/customer-api/CustomerPoint/org/${params.orgId}/action/GetWallet`;
  },
  method: "get",
});

// API returns array directly, not wrapped in object
export type GetPointTransactionResponse = IPointTransaction[];
export interface IPointTransaction {
  id: string;
  orgId: string;
  walletId: string;
  tags: string;
  description: string;
  txAmount: number;
  txType: number;
  currentBalance: number;
  previousBalance: number;
  createdDate: string;
  updatedDate: string | null;
}

export interface GetPointTransactionParams {
  orgId: string;
}

export const getPointTransactionService = createQueryService<
  GetPointTransactionResponse,
  null,
  GetPointTransactionParams
>({
  key: ["getPointTransaction"],
  url: (params) => {
    return `/customer-api/CustomerPoint/org/${params.orgId}/action/GetPointTxs`;
  },
  method: "get",
});
