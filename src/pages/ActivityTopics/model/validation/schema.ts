import { mixed, object, string, number } from 'yup';
import { ValidationMessages } from '@utils/validation';
import { WorkKind } from '@src/pages/ActivityTopics/model/types';
import { EffortKey } from '@src/pages/ActivityTopics/model/efforts';

import { limits, AllowedSymbols, EffortPositive } from './constants';

const commonSchema = {
  parent: mixed(),

  caption: string()
    .defined(ValidationMessages.required())
    .trim()
    .required(ValidationMessages.required())
    .max(limits.titleMaxLength, ValidationMessages.maxLengthExceeded)
};

const commonTopicGroupSchema = {
  ...commonSchema,

  componentKind: mixed().required(ValidationMessages.required()),

  shortTitle: string()
    .default('')
    .trim()
    .max(limits.shortTitleMaxLength, ValidationMessages.maxLengthExceeded)
    .matches(AllowedSymbols.regex, AllowedSymbols.message),
};

export const addTopicGroupSchema = object({
  ...commonTopicGroupSchema,
});

export const updateTopicGroupSchema = object({
  ...commonTopicGroupSchema,
});

const commonTopicItemSchema = {
  ...commonSchema,

  partType: mixed().required(ValidationMessages.required()),
};

const effortInMinutesSchema = number().default(0).min(0, EffortPositive.message);

const createEffortsSchema = (workKinds: WorkKind[]) => {
  const properties: { [key: string]: typeof effortInMinutesSchema } = {};

  workKinds
    .flatMap((wk) => wk.lessonKinds)
    .forEach((lk) => {
      properties[EffortKey.lessonKind(lk.id)] = effortInMinutesSchema;
    });

  return object(properties);
};

const createTopicItemSchema = (workKinds: WorkKind[]) =>
  object({
    ...commonTopicItemSchema,
    efforts: createEffortsSchema(workKinds),
  });

export const createAddTopicItemSchema = createTopicItemSchema;

export const createUpdateTopicItemSchema = createTopicItemSchema;
