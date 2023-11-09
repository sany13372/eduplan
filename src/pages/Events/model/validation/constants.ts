import { ValidationMessages } from '@utils/validation';

export const eventLimits = {
  titleMaxLength: 255,
  linkMaxLength: 255,
  placeMaxLength: 255,
  descriptionMaxLength: 65000,
};

export const AllowedSymbols = {
  regex: /^([a-zA-Zа-яА-ЯёЁ0-9\s.,+"-])*$/,

  message: ValidationMessages.invalidFormat({
    formatMessage: 'Допустимые символы: латинские и русские буквы, цифры, знаки " , . + -',
  }),
};
