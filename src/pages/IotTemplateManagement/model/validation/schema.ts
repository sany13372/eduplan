import { SchemaOf, string, object, array } from 'yup';
import { ValidationMessages } from '@utils/validation';
import { IotTemplate } from '@src/pages/IotTemplateManagement/model/types';
import {
  iotTemplateLimits,
  AllowedSymbols,
  minSelectedItemsMessage,
} from '@src/pages/IotTemplateManagement/model/validation/constants';

export const iotTemplateSchema: SchemaOf<Pick<IotTemplate, 'title'> & { rows: unknown[] }> = object({
  title: string()
    .defined(ValidationMessages.required())
    .trim()
    .required(ValidationMessages.required())
    .max(iotTemplateLimits.titleMaxLength, ValidationMessages.maxLengthExceeded)
    .matches(AllowedSymbols.regex, AllowedSymbols.message),
  rows: array().required(ValidationMessages.required()).min(1, minSelectedItemsMessage),
});
