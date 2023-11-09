import { mixed, SchemaOf, string, object, date, boolean } from 'yup';
import { BaseGroupInfo } from '@src/pages/GroupManagement/model/types';
import { ValidationMessages } from '@utils/validation';
import { AllowedSymbols, eduGrouplimits } from './constants';

export const eduGroupSchema: SchemaOf<Pick<BaseGroupInfo, 'title' | 'groupType'>> = object({
  title: string()
    .defined(ValidationMessages.required())
    .trim()
    .required(ValidationMessages.required())
    .max(eduGrouplimits.titleMaxLength, ValidationMessages.maxLengthExceeded)
    .matches(AllowedSymbols.regex, AllowedSymbols.message),

  groupType: mixed().required(ValidationMessages.required()),
});
