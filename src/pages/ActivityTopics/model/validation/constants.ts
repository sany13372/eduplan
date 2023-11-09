import { ValidationMessages } from '@utils/validation';

export const limits = {
  titleMaxLength: 255,
  shortTitleMaxLength: 30,
};

export const EffortPositive = {
  message: 'Количество часов не должно быть отрицательным.',
};

export const AllowedSymbols = {
  regex: /^([a-zA-Zа-яА-Я0-9\s.,+"-])*$/,

  message: ValidationMessages.invalidFormat({
    formatMessage: 'Допустимые символы: латинские и русские буквы, цифры, знаки " , . + -',
  }),
};
