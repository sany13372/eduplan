import { mixed, object, SchemaOf, string } from 'yup';
import { ValidationMessages } from '@utils/validation';
import { ShortActivityGroupInfo, ShortActivityInfo } from '@src/pages/ActivityManagement/model/types';
import { activityLimits, AllowedSymbols } from '@src/pages/ActivityManagement/model/validation/constants';

export const activitySchema: SchemaOf<Pick<ShortActivityInfo, 'shortTitle' | 'title' | 'category'>> = object({
  title: string()
    .defined(ValidationMessages.required())
    .trim()
    .required(ValidationMessages.required())
    .max(activityLimits.titleMaxLength, ValidationMessages.maxLengthExceeded)
    .matches(AllowedSymbols.regex, AllowedSymbols.message),
  shortTitle: string()
    .defined(ValidationMessages.required())
    .trim()
    .required(ValidationMessages.required())
    .max(activityLimits.shortTitleMaxLength, ValidationMessages.maxLengthExceeded)
    .matches(AllowedSymbols.regex, AllowedSymbols.message),
  category: mixed().required(ValidationMessages.required()),
});

export const activityGroupSchema: SchemaOf<Pick<ShortActivityGroupInfo, 'shortTitle' | 'title' | 'component'>> = object(
  {
    title: string()
      .defined(ValidationMessages.required())
      .trim()
      .required(ValidationMessages.required())
      .max(activityLimits.titleMaxLength, ValidationMessages.maxLengthExceeded)
      .matches(AllowedSymbols.regex, AllowedSymbols.message),
    shortTitle: string()
      .defined(ValidationMessages.required())
      .trim()
      .required(ValidationMessages.required())
      .max(activityLimits.shortTitleMaxLength, ValidationMessages.maxLengthExceeded)
      .matches(AllowedSymbols.regex, AllowedSymbols.message),
    component: mixed().required(ValidationMessages.required()),
  },
);
