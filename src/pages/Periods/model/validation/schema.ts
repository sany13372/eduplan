import { mixed, SchemaOf, string, object, date } from 'yup';
import { ValidationMessages } from '@utils/validation';
import { Dates, NewPeriod, Period } from '@src/pages/Periods/model/types';
import { periodLimits } from '@src/pages/Periods/model/validation/constants';
import { isValidDate } from '@utils/date';

const datesSchema: SchemaOf<Dates> = object({
  start: date()
    .required(ValidationMessages.required())
    .when('end', {
      is: (val?: Date) => (val ? isValidDate(val) : false),
      then: (schema) =>
        schema.test(
          'isBeforeEnd',
          'Дата начала периода не должна быть позже даты окончания периода',
          (value, context) => {
            if (!value || !context.parent.end || !isValidDate(value) || !isValidDate(context.parent.end)) return true;

            return value.getTime() <= context.parent.end.getTime();
          },
        ),
      otherwise: (schema) => schema,
    }),
  end: date().required(ValidationMessages.required()),
});
export const periodSchema: SchemaOf<NewPeriod | Period> = object({
  id: string(),
  title: string()
    .defined(ValidationMessages.required())
    .trim()
    .required(ValidationMessages.required())
    .max(periodLimits.titleMaxLength, ValidationMessages.maxLengthExceeded),
  eduGridElementId: string(),
  periodKind: mixed().required(ValidationMessages.required()),
  dates: datesSchema,
});
