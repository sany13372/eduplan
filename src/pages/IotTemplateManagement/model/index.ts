import { createDomain } from 'effector';
import { createAddActionNodes, createGetActionNodes, createUpdateActionNodes } from '@utils/effector';
import { Activity, GetActivityListParams, IotTemplate } from '@src/pages/IotTemplateManagement/model/types';

export const IotTemplateManagementDomain = createDomain('IotTemplateManagementDomain');
export const resetDomain = IotTemplateManagementDomain.createEvent();

export const activityStore = createGetActionNodes<GetActivityListParams, Activity[]>(IotTemplateManagementDomain, []);
export const addIotTemplate = createAddActionNodes<IotTemplate>(IotTemplateManagementDomain);

export const updateIotTemplate = createUpdateActionNodes<IotTemplate>(IotTemplateManagementDomain);
export const updateIotTemplateInitialData = createGetActionNodes<string, IotTemplate | null>(
  IotTemplateManagementDomain,
  null,
);
