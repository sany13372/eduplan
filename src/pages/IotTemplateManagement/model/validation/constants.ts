import { ValidationMessages } from '@utils/validation';

export const iotTemplateLimits = {
  titleMaxLength: 255,
};

export const AllowedSymbols = {
  regex: /^([a-zA-Zа-яА-Я0-9\s.,+"-])*$/,

  message: ValidationMessages.invalidFormat({
    formatMessage: 'Допустимые символы: латинские и русские буквы, цифры, знаки " , . + -',
  }),
};

export const minSelectedItemsMessage = 'Необходимо выбрать хотя бы одно мероприятие';
