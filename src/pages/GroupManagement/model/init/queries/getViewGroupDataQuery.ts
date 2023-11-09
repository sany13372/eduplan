import { castNotSkeletonDeep } from 'gqty';
import { query } from '@src/gql-client';
import { ViewGroupInfo } from '@src/pages/GroupManagement/model/types';

export const getViewGroupDataQuery = (eduGroupId: string): ViewGroupInfo => {
  const resp = query.readStudentGroups({
    where: {
      id: { _eq: eduGroupId },
      deletedAt: { _is_null: true },
    },
  });

  if (!resp || resp.length === 0) throw new Error('Не удалось получить данные учебной группы');

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { title, id, edu_plan, studentGroupType } = castNotSkeletonDeep(resp[0]);

  return {
    id,
    title: title ?? '',
    completitionPeriodTitle: edu_plan?.completionPeriodSetting?.completionPeriod?.title ?? '',
    eduFormTitle: edu_plan?.eduFormSetting?.eduForm?.title ?? '',
    eduPlanTitle: edu_plan?.title ?? '',
    eduProgramTitle: edu_plan?.eduProgram?.title ?? '',
    eduStartDate: edu_plan?.eduStartDate ? new Date(edu_plan.eduStartDate) : undefined,
    eduTechnologyTitle: edu_plan?.eduTechnologySetting?.eduTechnology?.title ?? '',
    enrollmentYear: edu_plan?.enrollmentYear ?? undefined,
    groupTypeTitle: studentGroupType?.title ?? '',
  };
};
