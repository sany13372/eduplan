import { createDomain } from 'effector';
import { createGetActionNodes, createUpdateActionNodes } from '@utils/effector';
import { emptyEduPlanDescription } from '@src/pages/Desc/model/constants';

import { EduPlanDesc } from './types';

export const EduPlanDescription = createDomain('EduPlanDescription');
export const resetDomainData = EduPlanDescription.createEvent();

export const eduPlanDesc = createGetActionNodes<string, EduPlanDesc>(EduPlanDescription, emptyEduPlanDescription);
export const updateEduPlanDesc = createUpdateActionNodes<EduPlanDesc>(EduPlanDescription);
