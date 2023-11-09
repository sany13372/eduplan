import { ValidationMessages } from '@utils/validation';

export const eduPlanLimits = {
  titleMaxLength: 255,
  shortTitleMaxLength: 30,
  minAcademicHoursInLessonAmount: 1,
  maxAcademicHoursInLessonAmount: 10,
  minAcademicHoursInCreditUnitAmount: 25,
  maxAcademicHoursInCreditUnitAmount: 45,
};

export const AllowedSymbols = {
  regex: /^([a-zA-Zа-яА-ЯёЁ0-9\s.,+"-])*$/,

  message: ValidationMessages.invalidFormat({
    formatMessage: 'Допустимые символы: латинские и русские буквы, цифры, знаки " , . + -',
  }),
};

export const getMinErrorMessage = (min: number) => `Значение должно быть больше или равно ${min}`;
export const getMaxErrorMessage = (max: number) => `Значение должно быть меньше или равно ${max}`;
