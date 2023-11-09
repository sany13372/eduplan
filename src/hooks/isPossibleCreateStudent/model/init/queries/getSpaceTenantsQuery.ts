import {query} from "@src/gql-client";


export const getSpaceTenantsQuery = (spaceId: string) => {
  const res = query.getSpaceTenants({ spaceId });
  const tenantRoles = (res || []).reduce((acc, tenant) => {
    tenant?.spaceTenantRoles?.forEach(role => acc.add(role?.name || ''))
    return acc;
  }, new Set<string>());

  return [...tenantRoles];
}