import { mixed, SchemaOf, string, object, } from 'yup';
import { BaseGroupInfo } from '@src/pages/GroupManagement/model/types';
import { ValidationMessages } from '@utils/validation';
import {
  GroupAllowedSymbols,
  eduGrouplimits,
  studentInfoLimits,
} from '@src/pages/StudentGroupList/model/validation/constants';


export const eduGroupSchema: SchemaOf<Pick<BaseGroupInfo, 'title' | 'groupType'>> = object({
  title: string()
    .defined(ValidationMessages.required())
    .trim()
    .required(ValidationMessages.required())
    .max(eduGrouplimits.titleMaxLength, ValidationMessages.maxLengthExceeded)
    .matches(GroupAllowedSymbols.regex, GroupAllowedSymbols.message),

  groupType: mixed().required(ValidationMessages.required()),
});

