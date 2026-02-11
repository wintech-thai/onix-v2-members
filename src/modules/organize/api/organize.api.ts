/* eslint-disable @typescript-eslint/no-empty-object-type */

import { createQueryService } from "@/lib/api-factory";

// /customer-api/CustomerOrganization/org/{id}/action/GetOrganization

export interface GetOrganizationResponse extends IOrganization {}

export interface IOrganization {
  orgId: string;
  orgCustomId: string;
  orgName: string;
  orgDescription: string;
  tags: string;
  addresses: string;
  channels: string;
  logoImagePath: string;
  addressesArray: string[];
  channelsArray: string[];
  logoImageUrl: string;
  orgCreatedDate: string;
}

export const getOrganizationApi = createQueryService<
  GetOrganizationResponse,
  null,
  { orgId: string }
>({
  key: ["get-organization"],
  url: (params) =>
    `/customer-api/CustomerOrganization/org/${params.orgId}/action/GetOrganization`,
  method: "get",
});
