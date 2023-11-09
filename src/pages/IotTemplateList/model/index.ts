import { createDomain } from 'effector';
import { createDeleteActionNodes, createGetActionNodes } from '@utils/effector';
import { EduGridElement, IotTemplateData, IotTemplateFilters } from '@src/pages/IotTemplateList/model/types';
import { Reference } from '@src/types';
import { defaultObj } from '@src/pages/IotTemplateList/model/constants';

export const IotTemplateListDomain = createDomain('IotTemplateListDomain');
export const resetDomain = IotTemplateListDomain.createEvent();
export const eduGridElementStore = createGetActionNodes<string, EduGridElement[]>(IotTemplateListDomain, []);
export const $filteredEduGridElementStore = IotTemplateListDomain.createStore<EduGridElement[]>([]);

export const iotTemplateStore = createGetActionNodes<string, IotTemplateData[]>(IotTemplateListDomain, []);
export const $filteredIotTemplateStore = IotTemplateListDomain.createStore<IotTemplateData[]>([]);

export const deleteIotTemplate = createDeleteActionNodes<IotTemplateData>(IotTemplateListDomain);

export const $filters = IotTemplateListDomain.createStore<IotTemplateFilters>({
  title: '',
  gridElementList: [defaultObj],
});

export const setTitleFilter = IotTemplateListDomain.createEvent<string>();
export const setGridElementListFilter = IotTemplateListDomain.createEvent<Reference[]>();
export const resetFilter = IotTemplateListDomain.createEvent();
