import { Reference } from '@src/types';
import { EmployeeType } from '@src/gql-client';

export const employeeTypeToReference = ({ id, employeePerson }: EmployeeType): Reference => {
  const firstNameRaw = employeePerson?.identityCard?.firstName;
  const firstName = firstNameRaw ? `${firstNameRaw.slice(0, 1)}.` : '';
  const lastNameRaw = employeePerson?.identityCard?.lastName;
  const lastName = lastNameRaw || '';
  const middleNameRaw = employeePerson?.identityCard?.middleName;
  const middleName = middleNameRaw ? `${middleNameRaw.slice(0, 1)}.` : '';

  return {
    id: id ?? '',
    caption: `${lastName} ${firstName} ${middleName}`.trim(),
  };
};
