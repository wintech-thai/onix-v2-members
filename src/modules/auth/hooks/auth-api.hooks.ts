import { createMutationHook } from "@/lib/hooks-factory";
import { customerLoginService } from "../api/auth.api";

export const useCustomerLoginMutation = createMutationHook(customerLoginService)
