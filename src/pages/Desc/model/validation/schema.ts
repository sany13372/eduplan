import { boolean, object, SchemaOf, string } from 'yup';
import { Desc, EduPlanDesc } from '@src/pages/Desc/model/types';
import { ValidationMessages } from '@utils/validation';
import { descLimits } from '@src/pages/Desc/model/validation/constants';
import isNil from 'lodash/isNil';

const groupSchema: SchemaOf<Desc> = object({
  description: string().trim().max(descLimits.descMaxLength, ValidationMessages.maxLengthExceeded),
  target: string().trim().max(descLimits.targetMaxLength, ValidationMessages.maxLengthExceeded),
  result: string().trim().max(descLimits.resultMaxLength, ValidationMessages.maxLengthExceeded),
  price: string().trim().max(descLimits.priceMaxLength, ValidationMessages.maxLengthExceeded),
  url: string().trim().max(descLimits.urlMaxLength, ValidationMessages.maxLengthExceeded),
  landing: string().trim().max(descLimits.landingMaxLength, ValidationMessages.maxLengthExceeded),
  priority: string()
    .test('onlyInteger', 'Разрешены только целые числа', (value) => {
      if (isNil(value)) return true;
      const isValid = new RegExp(/^[-0-9]+$/).test(value);
      return isValid;
    })
    .test('priorityValue', 'Приоритет может принимать значения от 0 до 99999', (value) => {
      if (isNil(value)) return true;
      const numVal = Number.parseInt(value, 10);
      return !Number.isNaN(numVal) && numVal >= 0 && numVal <= 99999;
    }),
  isPubl: boolean().required(ValidationMessages.required()).oneOf([true, false], 'Необходимо выбрать значение'),
});

// @ts-ignore
export const addEduPlanSchema: SchemaOf<EduPlanDesc> = object({
  id: string().required(ValidationMessages.required()),
  b2c: groupSchema,
  b2b: groupSchema,
});
