import { EmployeeType, StudentType } from '@src/gql-client';
import { Student, Teacher } from '@src/types';

export const employeeTypeToTeacher = (data: EmployeeType): Teacher => {
  return {
    id: data.id ?? '',
    email: data.employeePerson?.user?.email ?? '',
    fullName: {
      lastName: data.employeePerson?.identityCard?.lastName ?? '',
      middleName: data.employeePerson?.identityCard?.middleName ?? '',
      firstName: data.employeePerson?.identityCard?.firstName ?? '',
    },
    tenant: data.tenant
      ? {
          id: data.tenant.id ?? '',
          caption: data.tenant?.shortTitle ?? '',
        }
      : undefined,
  };
};

export const studentTypeToStudent = ({ id, group, studentPerson }: StudentType): Student => {
  return {
    id: id ?? '',
    email: studentPerson?.user?.email ?? '',
    fullName: {
      lastName: studentPerson?.identityCard?.lastName ?? '',
      middleName: studentPerson?.identityCard?.middleName ?? '',
      firstName: studentPerson?.identityCard?.firstName ?? '',
    },
    group: group
      ? {
          id: group.id ?? '',
          caption: group?.title ?? '',
        }
      : undefined,
  };
};
