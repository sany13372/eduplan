import { object, string, SchemaOf, mixed, boolean } from 'yup';
import { ValidationMessages } from '@utils/validation';
import { AddEduPlanInfo, EduPlanInfo, EduProgramInfo } from '@src/pages/EduPlans/model/types';
import { addEduKind, proEduKind } from '@src/pages/EduPlans/model/constants';
import parse from 'date-fns/parse';
import { isValid } from 'date-fns';

import { eduPlanLimits, AllowedSymbols, getMinErrorMessage, getMaxErrorMessage } from './constants';

const generateAvailableEnrollmentYear = () => {
  const currentYear: number = new Date().getFullYear();
  return `Укажите год от ${currentYear - 3} до ${currentYear + 3}`;
};
export const addEduPlanSchema: SchemaOf<Omit<Partial<AddEduPlanInfo>, 'id'>> = object({
  title: string()
    .defined(ValidationMessages.required())
    .trim()
    .required(ValidationMessages.required())
    .max(eduPlanLimits.titleMaxLength, ValidationMessages.maxLengthExceeded)
    .matches(AllowedSymbols.regex, AllowedSymbols.message),
  shortTitle: string()
    .defined(ValidationMessages.required())
    .trim()
    .required(ValidationMessages.required())
    .max(eduPlanLimits.shortTitleMaxLength, ValidationMessages.maxLengthExceeded)
    .matches(AllowedSymbols.regex, AllowedSymbols.message),
  eduForm: mixed().required(ValidationMessages.required()),
  eduTechnology: mixed().required(ValidationMessages.required()),
  competitionPeriod: mixed().required(ValidationMessages.required()),
  eduGrid: mixed().required(ValidationMessages.required()),
  enrollmentYear: string()
    .when('eduProgramInfo', {
      is: (val: EduProgramInfo) => val?.eduKindSystemCode === proEduKind, // alternatively: (val) => val == true
      then: (schema) => schema.required(ValidationMessages.required()),
      otherwise: (schema) => schema,
    })
    .test('isValidEnrollmentYear', generateAvailableEnrollmentYear, (value) => {
      const val = Number.parseInt(value ?? '', 10);
      const currentYear = new Date().getFullYear();
      if (Number.isNaN(val) || !Number.isInteger(val)) return true;
      return val >= currentYear - 3 && val <= currentYear + 3;
    })
    .test(
      'isLessThatEduStartYear',
      'Год набора обучающихся не может быть больше года  начала обучения',
      (value, context) => {
        const val = Number.parseInt(value ?? '', 10);
        const eduStartDate = parse(context.parent.eduStartDate, 'ddMMyyyy', new Date());
        if (Number.isNaN(val) || !Number.isInteger(val) || !isValid(eduStartDate)) return true;
        const eduStartYear: number = eduStartDate.getFullYear();
        return val <= eduStartYear;
      },
    ),
  eduStartDate: string()
    .typeError(ValidationMessages.required())
    .trim()
    .when('eduProgramInfo', {
      is: (val: EduProgramInfo) => val?.eduKindSystemCode === addEduKind,
      then: (schema) => schema.required(ValidationMessages.required()),
      otherwise: (schema) => schema,
    })
    .test(
      'isMoreThatEduStartYear',
      'Год начала обучения не может быть меньше года  набора обучающихся',
      (value, context) => {
        const eduStartDate = parse(context.parent.eduStartDate, 'ddMMyyyy', new Date());
        const enrollmentYear = Number.parseInt(context.parent.enrollmentYear ?? '', 10);
        if (Number.isNaN(enrollmentYear) || !Number.isInteger(enrollmentYear) || !isValid(eduStartDate)) return true;
        const eduStartYear = eduStartDate.getFullYear();
        return eduStartYear >= enrollmentYear;
      },
    )
    .test('isValidEduStartDate', 'Укажите дату в формате \'дд-мм-гггг\'', (value) => {
          const parsedDate = parse(value || '','ddMMyyyy', new Date())
          return isValid(parsedDate);
      }),
  doAccountHoursInAcademicHours: boolean().required(ValidationMessages.required()),
  academicHourDuration: mixed()
    .notOneOf([null])
    .when('doAccountHoursInAcademicHours', {
      is: true,
      then: (schema) => schema.required(ValidationMessages.required()),
      otherwise: (schema) => schema,
    }),
  doAccountLessonDuration: boolean().required(ValidationMessages.required()),
  academicHoursInLessonAmount: string().when(['doAccountHoursInAcademicHours', 'doAccountLessonDuration'], {
    is: (doAccountHoursInAcademicHours: boolean, doAccountLessonDuration: boolean) =>
      doAccountLessonDuration && doAccountHoursInAcademicHours,
    then: (schema) =>
      schema
        .required(ValidationMessages.required())
        .trim()
        .test('minValue', getMinErrorMessage(eduPlanLimits.minAcademicHoursInLessonAmount), (value) => {
          const val = Number.parseInt(value ?? '', 10);

          if (Number.isNaN(val) || !Number.isInteger(val)) return true;
          return val >= eduPlanLimits.minAcademicHoursInLessonAmount;
        })
        .test('maxValue', getMaxErrorMessage(eduPlanLimits.maxAcademicHoursInLessonAmount), (value) => {
          const val = Number.parseInt(value ?? '', 10);

          if (Number.isNaN(val) || !Number.isInteger(val)) return true;
          return val <= eduPlanLimits.maxAcademicHoursInLessonAmount;
        }),
    otherwise: (schema) => schema,
  }),
  doAccountHoursInCreditUnits: boolean().required(ValidationMessages.required()),
  academicHoursInCreditUnitAmount: string().when(['doAccountHoursInAcademicHours', 'doAccountHoursInCreditUnits'], {
    is: (doAccountHoursInAcademicHours: boolean, doAccountHoursInCreditUnits: boolean) =>
      doAccountHoursInCreditUnits && doAccountHoursInAcademicHours,
    then: (schema) =>
      schema
        .required(ValidationMessages.required())
        .trim()
        .test('minValue', getMinErrorMessage(eduPlanLimits.minAcademicHoursInCreditUnitAmount), (value) => {
          const val = Number.parseInt(value ?? '', 10);

          if (Number.isNaN(val) || !Number.isInteger(val)) return true;
          return val >= eduPlanLimits.minAcademicHoursInCreditUnitAmount;
        })
        .test('maxValue', getMaxErrorMessage(eduPlanLimits.maxAcademicHoursInCreditUnitAmount), (value) => {
          const val = Number.parseInt(value ?? '', 10);

          if (Number.isNaN(val) || !Number.isInteger(val)) return true;
          return val <= eduPlanLimits.maxAcademicHoursInCreditUnitAmount;
        }),
    otherwise: (schema) => schema,
  }),
  eduProgramInfo: mixed().notOneOf([null]),
  spaceInfo: mixed().required(ValidationMessages.required()),
  description: string(),
});

export const updateEduPlanSchema: SchemaOf<Omit<Partial<EduPlanInfo>, 'id'>> = addEduPlanSchema.omit([
  'competitionPeriod',
  'eduGrid',
]);
