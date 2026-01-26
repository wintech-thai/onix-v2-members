import { createQueryHook } from "@/lib/hooks-factory";
import { getPointTransactionService, getWalletService } from "../api/point.api";

export const useGetWalletQuery = createQueryHook(getWalletService);

export const useGetPointTransactionQuery = createQueryHook(getPointTransactionService);
