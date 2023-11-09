import { DropdownMenuItem } from '@src/components';

export enum Action {
  PERIODS_MANAGEMENT = 'PERIODS_MANAGEMENT',
  CREATE_ACTIVITY_GROUP = 'CREATE_ACTIVITY_GROUP',
  CREATE_ACTIVITY = 'CREATE_ACTIVITY',
}
export type MenuItem = DropdownMenuItem & {
  id: Action;
};

export type EduGridInfo = {
  eduProgId: string;
  eduPlanId: string;
  gridElementId: string;
};
