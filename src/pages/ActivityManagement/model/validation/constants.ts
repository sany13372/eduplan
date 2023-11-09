import { ValidationMessages } from '@utils/validation';

export const activityLimits = {
  titleMaxLength: 255,
  shortTitleMaxLength: 30,
};

export const AllowedSymbols = {
  regex: /^([a-zA-Zа-яА-ЯёЁ0-9\s.,+"-])*$/,

  message: ValidationMessages.invalidFormat({
    formatMessage: 'Допустимые символы: латинские и русские буквы, цифры, знаки " , . + -',
  }),
};
