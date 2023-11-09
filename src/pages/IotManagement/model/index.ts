import { createDomain } from 'effector';
import { createAddActionNodes, createDeleteActionNodes, createGetActionNodes } from '@utils/effector';
import { IotTemplateListDomain } from '@src/pages/IotTemplateList/model';
import {
  defauleEduGridElementItem,
  defaultNewFilterVal,
  defaultPagination,
} from '@src/pages/IotManagement/model/constants';
import {
  Activity,
  AddIotData,
  CheckedStateInfo,
  EduGridElementData,
  EduGridElementObj,
  FilterObjNew,
  GetStudentsListInfoParams,
  GetTemplatesParams,
  GroupObj,
  IotTemplateData,
  StudentsListInfo,
  TrajectoryData,
} from '@src/pages/IotManagement/model/types';

export const IotManagmentDomain = createDomain('IotManagmentDomain');
export const resetDomain = IotManagmentDomain.createEvent();

export const $userList = IotManagmentDomain.createStore<string[]>([]);
export const setUserList = IotManagmentDomain.createEvent<string[]>();
export const eduGridElements = createGetActionNodes<string, EduGridElementData[]>(IotManagmentDomain, []);

export const $filteredEduGridElements = IotManagmentDomain.createStore<EduGridElementData[]>([]);
export const $eduGridElementsFilter = IotManagmentDomain.createStore<EduGridElementObj[]>([defauleEduGridElementItem]);
export const setGridElementsFilter = IotTemplateListDomain.createEvent<EduGridElementObj[]>();
export const resetEduGridElementsFilter = IotTemplateListDomain.createEvent();

export const groupList = createGetActionNodes<string, GroupObj[]>(IotManagmentDomain, []);

export const setCheckedState = IotTemplateListDomain.createEvent<CheckedStateInfo>();

export const iotTemplates = createGetActionNodes<GetTemplatesParams, IotTemplateData[]>(IotManagmentDomain, []);
export const addIot = createAddActionNodes<AddIotData>(IotManagmentDomain);

export const activityList = createGetActionNodes<string, Activity[]>(IotManagmentDomain, []);
export const deleteTrajectory = createDeleteActionNodes<TrajectoryData>(IotTemplateListDomain);

export const $newFilters = IotManagmentDomain.createStore<FilterObjNew>(defaultNewFilterVal);
export const setNewFilterVal = IotTemplateListDomain.createEvent<Partial<FilterObjNew>>();
export const resetNewFilterVal = IotTemplateListDomain.createEvent();

export const studentTrajectoryMap = createGetActionNodes<GetStudentsListInfoParams, StudentsListInfo>(
  IotTemplateListDomain,
  { data: [], pagination: defaultPagination },
  'initial',
);

export const $baseInfo = IotManagmentDomain.createStore<{ planId: string }>({ planId: '' });
export const setBaseInfo = IotTemplateListDomain.createEvent<string>();
