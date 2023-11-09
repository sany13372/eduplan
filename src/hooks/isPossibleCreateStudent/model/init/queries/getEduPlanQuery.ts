import {query} from "@src/gql-client";


export const getEduPlanQuery = (eduPlanId: string) => {
  const res = query.readEduPlan({ id: eduPlanId });

  return  { spaceId: res?.spaceId || '' };
}