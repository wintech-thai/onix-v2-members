import { createQueryHook } from "@/lib/hooks-factory";
import { getOrganizationApi } from "../api/organize.api";

export const getOrganizationQuery = createQueryHook(getOrganizationApi);
