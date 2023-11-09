import { connectReferenceListNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import {
  controlFormStore,
  resetDomain,
  scaleElementTypesStore,
  scaleTypesStore,
} from '@src/pages/LessonSettings/model';
import {
  getControlFormsQuery,
  getScaleElementTypesQuery,
  getScaleTypesQuery,
} from '@src/pages/LessonSettings/model/init/queries';

connectReferenceListNodes({
  nodes: scaleTypesStore,
  handler: async () => resolved(() => getScaleTypesQuery(), { noCache: true }),
  resetOn: [resetDomain],
});

connectReferenceListNodes({
  nodes: scaleElementTypesStore,
  handler: async () => resolved(() => getScaleElementTypesQuery(), { noCache: true }),
  resetOn: [resetDomain],
});

connectReferenceListNodes({
  nodes: controlFormStore,
  handler: async () => resolved(() => getControlFormsQuery(), { noCache: true }),
  resetOn: [resetDomain],
});
