import { ValidationMessages } from '@utils/validation';

export const descLimits = {
  descMaxLength: 65000,
  targetMaxLength: 65000,
  resultMaxLength: 65000,
  priceMaxLength: 30,
  urlMaxLength: 512,
  landingMaxLength: 512,
};

export const AllowedSymbols = {
  regex: /^([a-zA-Zа-яА-ЯёЁ0-9\s.,+"-])*$/,

  message: ValidationMessages.invalidFormat({
    formatMessage: 'Допустимые символы: латинские и русские буквы, цифры, знаки " , . + -',
  }),
};

export const getMinErrorMessage = (min: number) => `Значение должно быть больше ${min}`;
export const getMaxErrorMessage = (max: number) => `Значение должно быть меньше ${max}`;
