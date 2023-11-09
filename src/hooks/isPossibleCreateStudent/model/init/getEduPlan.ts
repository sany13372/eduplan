import {connectGetActionNodes} from "@utils/effector";
import {
  eduPlanData,
  resetDomain,
} from "@src/hooks/isPossibleCreateStudent/model";
import {resolved} from "@src/gql-client";
import {getEduPlanQuery} from "./queries";

connectGetActionNodes({
  nodes: eduPlanData,
  handler: async (eduPlanId) => resolved(() => getEduPlanQuery(eduPlanId), { noCache: true }),
  resetOn: [resetDomain],
});