import { ValidationMessages } from '@utils/validation';

export const eduGrouplimits = {
  titleMaxLength: 15,
};

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

export const StudentAllowedSymbols = {
  regex: /^([a-zA-Zа-яА-Я0-9\s.,+"-])*$/,

  message: ValidationMessages.invalidFormat({
    formatMessage: 'Допустимые символы: латинские и русские буквы, цифры, знаки " , . + -',
  }),
};
