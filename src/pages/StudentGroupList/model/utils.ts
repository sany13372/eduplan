import { GetStudentMapParams, GroupStudentsMap } from '@src/pages/StudentGroupList/model/types';
import { defaultGroupStudentsInfo } from '@src/pages/StudentGroupList/model/constants';
import { Reference } from '@src/types';

export const prepareGetStudentMapParams = (groups: Reference[], eduPlanId: string): GetStudentMapParams => {
  const data: GroupStudentsMap = {};

  groups.forEach(({ id }) => {
    data[id] = defaultGroupStudentsInfo;
  });
  return {
    data,
    eduPlanId,
  };
};
