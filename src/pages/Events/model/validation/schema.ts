import { object, string, SchemaOf, mixed } from 'yup';
import { ValidationMessages } from '@utils/validation';
import { SetEventInfo, EventReference } from '@src/pages/Events/model/types';
import { isValidDate, localDateStringToDate } from '@utils/date';
import { isPast } from 'date-fns';
import isNaN from 'lodash/isNaN';

import { AllowedSymbols, eventLimits } from './constants';

export const eventValidationSchema: SchemaOf<
  Pick<
    Partial<SetEventInfo>,
    'format' | 'kind' | 'title' | 'description' | 'link' | 'place' | 'date' | 'startTime' | 'endTime'
  >
> = object({
  format: mixed().required(ValidationMessages.required()),
  kind: mixed().required(ValidationMessages.required()),
  videoConfKind: mixed().when('format', {
    is: (format: EventReference) => ['online', 'mixed'].includes(format?.systemCode),
    then: (schema) => schema.required(ValidationMessages.required()),
    otherwise: (schema) => schema,
  }),
  title: string()
    .defined(ValidationMessages.required())
    .trim()
    .required(ValidationMessages.required())
    .max(eventLimits.titleMaxLength, ValidationMessages.maxLengthExceeded)
    .matches(AllowedSymbols.regex, AllowedSymbols.message),
  description: string().trim().max(65000, ValidationMessages.maxLengthExceeded),
  // .matches(AllowedSymbols.regex, AllowedSymbols.message),
  link: string().when(['format', 'videoConfKind'], {
    is: (format: EventReference, videoConfKind: EventReference) =>
      ['online', 'mixed'].includes(format?.systemCode) && videoConfKind?.systemCode !== 'webinar',
    then: (schema) =>
      schema
        .trim()
        .required(ValidationMessages.required())
        .max(eventLimits.linkMaxLength, ValidationMessages.maxLengthExceeded),
    otherwise: (schema) => schema,
  }),
  place: string().when('format', {
    is: (val: EventReference) => ['offline', 'mixed'].includes(val?.systemCode),
    then: (schema) =>
      schema
        .trim()
        .required(ValidationMessages.required())
        .max(eventLimits.linkMaxLength, ValidationMessages.maxLengthExceeded)
        .matches(AllowedSymbols.regex, AllowedSymbols.message),
    otherwise: (schema) => schema,
  }),

  date: string()
    .typeError(ValidationMessages.required())
    .required(ValidationMessages.required())
    .test('isValidDate', 'Укажите корректную дату', (value) => {
      const parsedDate = localDateStringToDate(`${value}2359`);
      return isValidDate(parsedDate);
    })
    .test('isNotPast', 'Дата события уже прошла', (value) => {
      const parsedDate = localDateStringToDate(`${value}2359`);
      if (!isValidDate(parsedDate)) return true;
      return !isPast(parsedDate);
    }),
  startTime: string()
    .typeError(ValidationMessages.required())
    .required(ValidationMessages.required())
    .length(4, 'Укажите корректное время')
    .when('date', {
      is: (val?: string) => isValidDate(localDateStringToDate(`${val ?? ''}2359`)),
      then: (schema) =>
        schema.trim().test('isNotPast', 'Невозможно указать прошедшее время', (value, context) => {
          const parsedDate = localDateStringToDate(`${context.parent.date}${value}`);
          if (!isValidDate(parsedDate)) return true;
          return !isPast(parsedDate);
        }),
      otherwise: (schema) => schema,
    }),
  endTime: string()
    .typeError(ValidationMessages.required())
    .required(ValidationMessages.required())
    .length(4, 'Укажите корректное время')
    .when('date', {
      is: (val?: string) => isValidDate(localDateStringToDate(`${val ?? ''}2359`)),
      then: (schema) =>
        schema.trim().test('isNotPast', 'Невозможно указать прошедшее время', (value, context) => {
          const parsedDate = localDateStringToDate(`${context.parent.date}${value}`);
          if (!isValidDate(parsedDate)) return true;
          return !isPast(parsedDate);
        }),
      otherwise: (schema) => schema,
    })
    .when('startTime', {
      is: (val?: string) => val?.length === 4 && !isNaN(Number.parseInt(val, 10)),
      then: (schema) =>
        schema.trim().test('isBeforeStart', 'Время окончания не может быть раньше времени начала', (value, context) => {
          const { startTime } = context.parent;
          if (!value || !startTime || value.length !== 4 || startTime.length !== 4) return true;
          const endTimeAsNum = Number.parseInt(value, 10);
          const startTimeAsNum = Number.parseInt(startTime, 10);
          if (isNaN(endTimeAsNum) || isNaN(startTimeAsNum)) return true;
          return endTimeAsNum > startTimeAsNum;
        }),
      otherwise: (schema) => schema,
    }),
});
