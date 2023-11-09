import {connectGetActionNodes} from "@utils/effector";
import {
  resetDomain, tenantsRoles, eduPlanData
} from "@src/hooks/isPossibleCreateStudent/model";
import {resolved} from "@src/gql-client";
import {getSpaceTenantsQuery} from "./queries";
import {sample} from "effector";

connectGetActionNodes({
  nodes: tenantsRoles,
  handler: async (eduPlanId) => resolved(() => getSpaceTenantsQuery(eduPlanId), { noCache: true }),
  resetOn: [resetDomain],
});

sample({
  clock: eduPlanData.getFx.doneData,
  fn: (eduPlanData) => eduPlanData.spaceId || '',
  target: tenantsRoles.get
})