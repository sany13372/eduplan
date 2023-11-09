import { date, mixed, array, object, SchemaOf, string } from 'yup';
import { StudentInfo } from './types';
import {
  ValidationMessages,
  maxLengthExceeded, isValidINN, isValidSNILS
} from '@utils/validation';
import {Reference} from "@src/types";

export const GroupAllowedSymbols = {
  regex: /^([a-zA-Zа-яА-Я0-9\s.,+"-])*$/,

  message: ValidationMessages.invalidFormat({
    formatMessage: 'Допустимые символы: латинские и русские буквы, цифры, знаки " , . + -',
  }),
};

export const studentInfoLimits = {
  emailMaxLength: 100,
  firstNameMaxLength: 25,
  lastNameMaxLength: 25,
  middleNameMaxLength: 25,
  personalNumberMaxLength: 25,
  bookNumberMaxLength: 25,
  innMaxLength: 15,
  snilsMaxLength: 15,
};

const StudentValidationMessages = {
  email: {
    required: () => 'Укажите адрес электронной почты',
    incorrect: () => 'Укажите правильный адрес электронной почты',
  },
  lastName: {
    required: () => 'Укажите фамилию'
  },
  firstName: {
    required: () => 'Укажите имя',
  },
  financingSource: {
    required: () => 'Выберите источник финансирования',
  },
  snils: {
    incorrect: () => 'Укажите правильный СНИЛС',
  },
  inn: {
    incorrect: () => 'Укажите правильный ИНН',
  },
};

export const studentInfoSchema: SchemaOf<Partial<StudentInfo>> = object({
  id: string(),
  spaceId: string(),
  eduPlanId: string(),
  email: string()
    .required(StudentValidationMessages.email.required())
    .trim()
    .email(StudentValidationMessages.email.incorrect())
    .max(studentInfoLimits.emailMaxLength, maxLengthExceeded),
  lastName: string()
    .trim()
    .required(StudentValidationMessages.lastName.required())
    .max(studentInfoLimits.lastNameMaxLength, maxLengthExceeded)
    .matches(GroupAllowedSymbols.regex, GroupAllowedSymbols.message),
  firstName: string()
    .trim()
    .required(StudentValidationMessages.firstName.required())
    .max(studentInfoLimits.firstNameMaxLength, maxLengthExceeded)
    .matches(GroupAllowedSymbols.regex, GroupAllowedSymbols.message),
  middleName: string()
    .trim()
    .max(studentInfoLimits.middleNameMaxLength, maxLengthExceeded)
    .matches(GroupAllowedSymbols.regex, GroupAllowedSymbols.message),
  birthDate: date(),
  sex: mixed().nullable(),
  personalNumber: string().trim().max(studentInfoLimits.personalNumberMaxLength, maxLengthExceeded),
  bookNumber: string().trim().max(studentInfoLimits.bookNumberMaxLength, maxLengthExceeded),
  course: mixed().nullable(),
  financingSource: mixed().required(StudentValidationMessages.financingSource.required()),
  group: mixed().nullable(),
  hasNotInnNumber: array(),
  innNumber: string()
    .trim()
    .max(studentInfoLimits.innMaxLength, maxLengthExceeded)
    .when('hasNotInnNumber', {
      is: (v: Reference[]) => Boolean(v.length),
      then: (schema) => schema,
      otherwise: (schema) => schema
        .required(ValidationMessages.required())
        .test('test-inn', StudentValidationMessages.inn.incorrect(), (inn) => isValidINN(inn || '')),
    }),
  hasNotSnilsNumber: array(),
  snilsNumber: string()
    .trim()
    .max(studentInfoLimits.snilsMaxLength, ValidationMessages.maxLengthExceeded)
    .when('hasNotSnilsNumber', {
      is: (v: Reference[]) => Boolean(v.length),
      then: (schema) => schema,
      otherwise: (schema) => schema
        .required(ValidationMessages.required())
        .test('test-snils', StudentValidationMessages.snils.incorrect(), (snils) => isValidSNILS(snils || '')),
    }),
});
