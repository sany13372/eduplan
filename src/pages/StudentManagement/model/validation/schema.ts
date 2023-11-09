import { mixed, SchemaOf, string, object, date, boolean } from 'yup';
import { ValidationMessages } from '@utils/validation';
import { StudentInfo } from '@src/pages/StudentManagement/model/types';
import { AllowedSymbols, studentInfoLimits } from '@src/pages/StudentManagement/model/validation/constants';

export const studentInfoSchema: SchemaOf<Partial<StudentInfo>> = object({
  id: string(),
  spaceId: string(),
  eduPlanId: string(),
  email: string()
    .required(ValidationMessages.required())
    .trim()
    .email(ValidationMessages.email())
    .max(studentInfoLimits.emailMaxLength, ValidationMessages.maxLengthExceeded),
  lastName: string()
    .trim()
    .required(ValidationMessages.required())
    .max(studentInfoLimits.lastNameMaxLength, ValidationMessages.maxLengthExceeded)
    .matches(AllowedSymbols.regex, AllowedSymbols.message),
  firstName: string()
    .trim()
    .required(ValidationMessages.required())
    .max(studentInfoLimits.firstNameMaxLength, ValidationMessages.maxLengthExceeded)
    .matches(AllowedSymbols.regex, AllowedSymbols.message),
  middleName: string()
    .trim()
    .max(studentInfoLimits.middleNameMaxLength, ValidationMessages.maxLengthExceeded)
    .matches(AllowedSymbols.regex, AllowedSymbols.message),
  birthDate: date().typeError(ValidationMessages.required()),
  sex: mixed().nullable(),
  personalNumber: string().trim().max(studentInfoLimits.personalNumberMaxLength, ValidationMessages.maxLengthExceeded),
  bookNumber: string().trim().max(studentInfoLimits.bookNumberMaxLength, ValidationMessages.maxLengthExceeded),
  course: mixed().nullable(),
  financingSource: mixed().required(ValidationMessages.required()),
  group: mixed().nullable(),
  hasNotInnNumber: boolean().required(ValidationMessages.required()),
  innNumber: string()
    .trim()
    .max(studentInfoLimits.innMaxLength, ValidationMessages.maxLengthExceeded)
    .when('hasNotInnNumber', {
      is: true,
      then: (schema) => schema,
      otherwise: (schema) => schema.required(ValidationMessages.required()),
    }),
  hasNotSnilsNumber: boolean().required(ValidationMessages.required()),
  snilsNumber: string()
    .trim()
    .max(studentInfoLimits.snilsMaxLength, ValidationMessages.maxLengthExceeded)
    .when('hasNotSnilsNumber', {
      is: true,
      then: (schema) => schema,
      otherwise: (schema) => schema.required(ValidationMessages.required()),
    }),
});
