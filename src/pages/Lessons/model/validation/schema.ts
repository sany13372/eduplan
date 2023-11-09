import { mixed, SchemaOf, string, object } from 'yup';
import { ValidationMessages } from '@utils/validation';
import { LessonItemShort, LessonSettingExt } from '@src/pages/Lessons/model/types';
import {
  lessonLimits,
  isInvalidDateMessage,
  isNotPastStartDateMessage,
  isBeforeEndDateMessage,
  isNotPastEndDateMessage,
  isNotPastPassDateMessage,
  passDateBeforeStartDateMessage,
  passDateAfterEndDateMessage,
} from '@src/pages/Lessons/model/validation/constants';
import { isValidDate, localDateStringToDate } from '@utils/date';

export const lessonSchema: SchemaOf<Pick<LessonItemShort, 'title' | 'eduKind'>> = object({
  title: string()
    .defined(ValidationMessages.required())
    .trim()
    .required(ValidationMessages.required())
    .max(lessonLimits.titleMaxLength, ValidationMessages.maxLengthExceeded),

  eduKind: mixed().required(ValidationMessages.required()),
});

const isValidDateTest = (value?: string) => {
  if (!value) return true;
  return isValidDate(localDateStringToDate(value));
};

const isNotPastDate = (value?: string) => {
  if (!value || (value && !isValidDateTest(value))) return true;
  const dateValue = localDateStringToDate(value).getTime();
  const currentDateValue = new Date().getTime();
  return dateValue >= currentDateValue;
};

const compareDates = (dateStringA?: string, dateStringB?: string) => {
  if (
    !dateStringA ||
    !dateStringB ||
    (dateStringA && !isValidDateTest(dateStringA)) ||
    (dateStringB && !isValidDateTest(dateStringB))
  )
    return true;
  const dateStringBValue = localDateStringToDate(dateStringB).getTime();
  const dateStringAValue = localDateStringToDate(dateStringA).getTime();
  return dateStringAValue <= dateStringBValue;
};

export const settingsSchema: SchemaOf<Pick<LessonSettingExt, 'isAllowAlways' | 'endDate' | 'passDate' | 'startDate'>> =
  object({
    isAllowAlways: mixed().oneOf([true, false]),
    startDate: string().when('isAllowAlways', {
      is: true,
      then: (schema) => schema,
      otherwise: (schema) =>
        schema
          .required(ValidationMessages.required())
          .test('isValidEnrollmentYear', isInvalidDateMessage, isValidDateTest)
          .test('isNotPastDate', isNotPastStartDateMessage, isNotPastDate)
          .test('isBeforeEndDate', isBeforeEndDateMessage, (value, context) => {
            const { endDate } = context.parent;
            return compareDates(value, endDate);
          }),
    }),
    endDate: string().when('isAllowAlways', {
      is: true,
      then: (schema) => schema,
      otherwise: (schema) =>
        schema
          .required(ValidationMessages.required())
          .test('isValidEnrollmentYear', isInvalidDateMessage, isValidDateTest)
          .test('isNotPastDate', isNotPastEndDateMessage, isNotPastDate)
          .test('isAfterStartDate', isBeforeEndDateMessage, (value, context) => {
            const { startDate } = context.parent;
            return compareDates(startDate, value);
          }),
    }),
    passDate: string()
      .test('isValidEnrollmentYear', isInvalidDateMessage, isValidDateTest)
      .when('isAllowAlways', {
        is: true,
        then: (schema) => schema,
        otherwise: (schema) =>
          schema
            .test('isNotPastDate', isNotPastPassDateMessage, isNotPastDate)
            .test('passDateBeforeEndDate', passDateAfterEndDateMessage, (value, context) => {
              const { endDate } = context.parent;
              return compareDates(value, endDate);
            })
            .test('passDateAfterStartDate', passDateBeforeStartDateMessage, (value, context) => {
              const { startDate } = context.parent;
              return compareDates(startDate, value);
            }),
      }),
  });
