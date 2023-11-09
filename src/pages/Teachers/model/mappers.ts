import { EduGridWithActivitiesType, EduPlanActivityType, EmployeeType, Maybe } from '@src/gql-client';
import isNil from 'lodash/isNil';

import { ActivityInfo, SemesterInfo, TeacherInfo } from './types';

export const parseTeacherInfo = (data: Maybe<EmployeeType>): TeacherInfo => ({
  id: data?.id ?? '',
  email: data?.employeePerson?.user?.email ?? '',
  firstName: data?.employeePerson?.identityCard?.firstName ?? '',
  lastName: data?.employeePerson?.identityCard?.lastName ?? '',
  middleName: data?.employeePerson?.identityCard?.middleName ?? '',
  tenant: {
    id: data?.tenant?.id ?? '',
    shortTitle: data?.tenant?.shortTitle ?? '',
    title: data?.tenant?.title ?? '',
  },
});

function isMaybeEmploeeType(item: Maybe<EmployeeType> | undefined): item is Maybe<EmployeeType> {
  return item !== undefined;
}

const parseActivityInfo = (activity: Maybe<EduPlanActivityType>): ActivityInfo => ({
  id: activity?.id ?? '',
  name: activity?.title ?? '',
  teacherList:
    (activity?.activityEmployees ?? [])
      .map((e) => e?.employeeType)
      .filter(isMaybeEmploeeType)
      .map((e) => parseTeacherInfo(e)) ?? [],
});

export const parseSemesterInfo = (semester: Maybe<EduGridWithActivitiesType>): SemesterInfo => ({
  id: semester?.id ?? '',
  name: semester?.title ?? '',
  activityList: semester?.eduPlanActivities?.filter((e) => !isNil(e)).map(parseActivityInfo) ?? [],
});
