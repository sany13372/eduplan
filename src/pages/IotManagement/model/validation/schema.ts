import { mixed, SchemaOf, object } from 'yup';
import { ValidationMessages } from '@utils/validation';
import { AddIotData } from '@src/pages/IotManagement/model/types';

export const iotSchema: SchemaOf<Pick<AddIotData, 'iotTemplateData'>> = object({
  iotTemplateData: mixed().required(ValidationMessages.required()),
});
