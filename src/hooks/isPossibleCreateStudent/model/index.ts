import {createGetActionNodes} from "@utils/effector";
import {createDomain, createEvent} from "effector";

export const CreateStudent = createDomain('CreateStudent')
export const resetDomain = createEvent();

export const eduPlanData = createGetActionNodes<string, {spaceId?: string}>(CreateStudent, {
  spaceId: undefined,
});
export const tenantsRoles = createGetActionNodes<string, string[]>(CreateStudent, []);