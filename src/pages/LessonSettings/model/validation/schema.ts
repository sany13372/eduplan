/* eslint-disable no-plusplus */
import { SchemaOf, string, object, date, boolean, number, array } from 'yup';
import { ValidationMessages } from '@utils/validation';
import { GradeElement, GradeSettingItem, ScoreInfo, Stream } from '@src/pages/LessonSettings/model/types';
import { compareAsc } from 'date-fns';
import upperFirst from 'lodash/upperFirst';
import isNil from 'lodash/isNil';

const isAfterThisDate = (val?: Date | null) => {
  if (!val) return true;
  const currentDate = new Date().setHours(0, 0, 0, 0);
  const valDate = new Date(val.toDateString()).setHours(0, 0, 0, 0);
  return [1, 0].includes(compareAsc(valDate, currentDate));
};

export const streamTitleValidationSchema: SchemaOf<Partial<Pick<Stream, 'title'>>> = object({
  title: string()
    .defined(ValidationMessages.required())
    .trim()
    .required(ValidationMessages.required())
    .max(255, ValidationMessages.maxLengthExceeded),
});

export const streamDatesValidationSchema: SchemaOf<
  Partial<Pick<Stream, 'isAllowAlways' | 'startDate' | 'endDate' | 'passDate'>>
> = object({
  isAllowAlways: boolean().required(ValidationMessages.required()),
  startDate: date().when('isAllowAlways', {
    is: true,
    then: (schema) => schema.nullable(),
    otherwise: (schema) =>
      schema
        .typeError('Укажите дату и время начала занятия')
        .required(ValidationMessages.required())
        .test('isAfterThisDate', 'Дата начала занятия не может быть раньше сегодняшнего дня', isAfterThisDate),
  }),
  endDate: date().when('isAllowAlways', {
    is: true,
    then: (schema) => schema.nullable(),
    otherwise: (schema) =>
      schema
        .typeError('Укажите дату и время окончания занятия')
        .required(ValidationMessages.required())
        .test('isAfterThisDate', 'Дата окончания занятия не может быть раньше сегодняшнего дня', isAfterThisDate)
        .test(
          'isAfterStartDate',
          'Дата и время окончания не должны предшествовать дате и времени начала',
          (val, context) => {
            if (!val || !context.parent.endDate) return true;
            return [1, 0].includes(compareAsc(val, context.parent.startDate));
          },
        ),
  }),
  passDate: date()
    .nullable(true)
    .test('isAfterThisDate', 'Срок сдачи не может быть раньше сегодняшнего дня', isAfterThisDate)
    .when('isAllowAlways', {
      is: true,
      otherwise: (schema) =>
        schema.test(
          'isAfterStartDateAndBeforeEndDate',
          'Срок сдачи не должен быть раньше даты и времени начала и позже даты и времени окончания',
          (val, context) => {
            if (!val || !context.parent.startDate || !context.parent.endDate) return true;
            const compareWithStartDate = compareAsc(val, context.parent.startDate);
            const compareWithEndDate = compareAsc(val, context.parent.endDate);
            return compareWithStartDate === 1 && (compareWithEndDate === -1 || compareWithEndDate === 0);
          },
        ),
    }),
});

export const streamValidationSchema: SchemaOf<
  Partial<Pick<Stream, 'title' | 'isAllowAlways' | 'startDate' | 'endDate' | 'passDate'>>
> = object({}).concat(streamTitleValidationSchema).concat(streamDatesValidationSchema);

export const gradeElementValidationSchema: SchemaOf<GradeElement> = object({
  id: string().required(ValidationMessages.required()),
  caption: string().required(ValidationMessages.required()),
  systemCode: string().required(ValidationMessages.required()),
  gradeId: string().required(ValidationMessages.required()),
});

export const gradeSettingValidationSchema: SchemaOf<GradeSettingItem> = object({
  item: gradeElementValidationSchema,
  val: number().typeError(ValidationMessages.required()).required(ValidationMessages.required()),
});

export const scoreInfoValidationSchema: SchemaOf<Pick<ScoreInfo, 'lessonScoreValue' | 'gradeSettings' | 'gradeScale'>> =
  object({
    lessonScoreValue: number()
      .typeError(ValidationMessages.required())
      .required(ValidationMessages.required())
      .min(0, 'Количество баллов должно быть больше или равно 0'),
    gradeScale: object({
      id: string().required(ValidationMessages.required()),
      caption: string().required(ValidationMessages.required()),
      systemCode: string().required(ValidationMessages.required()),
    }).required(ValidationMessages.required()),
    gradeSettings: array().of(
      gradeSettingValidationSchema
        .test('testMinValue', 'Укажите корректное значение', (val, { createError, parent = [] }) => {
          // TODO: Рефакторинг данной проверки
          const itemId = val?.item?.id ?? '';
          const valInd = parent.findIndex((e: GradeSettingItem) => e.item.id === itemId);
          if (!val || isNil(val?.val) || Number.isNaN(val.val) || valInd === -1) return true;
          if (valInd === 0) {
            return val.val >= 0
              ? true
              : createError({
                  message: { val: `Количество баллов должно быть больше или равно 0` },
                });
          }

          const prevItem = parent[valInd - 1];
          const prevVal = prevItem?.val ?? '';
          return Number.isNaN(prevVal) || (!Number.isNaN(prevVal) && val.val > prevVal)
            ? true
            : createError({
                message: {
                  val: `Количество баллов должно быть больше, чем для оценки «${upperFirst(
                    prevItem?.item?.caption ?? '',
                  )}»`,
                },
              });
        })
        .test(
          'testMaxValue',
          'Укажите корректное значение',
          (val, { createError, parent = [], options: { context } }) => {
            // TODO: Рефакторинг данной проверки
            const itemId = val?.item?.id ?? '';
            const valInd = parent.findIndex((e: GradeSettingItem) => e.item.id === itemId);
            const maxVal = context?.lessonScoreValue;
            if (
              isNil(val?.val) ||
              Number.isNaN(val.val) ||
              !maxVal ||
              Number.isNaN(maxVal) ||
              valInd === -1 ||
              valInd !== parent.length - 1
            )
              return true;

            return val.val <= maxVal
              ? true
              : createError({
                  message: { val: `Количество баллов не должно быть больше максимального количества баллов` },
                });
          },
        ),
    ),
  });
