import { createDomain } from 'effector';
import { createAddActionNodes, createConfirmNodes, createGetActionNodes } from '@utils/effector';
import { BaseInfo, ChooseStudentsInfo, GetStudentsParams } from '@src/widgets/ChooseStudents/model/types';
import { defaultStudentListInfo } from '@src/widgets/ChooseStudents/model/constants';
import { LessonSettingsDomain } from '@src/pages/LessonSettings/model';

export const ChooseStudentsDomain = createDomain('ChooseStudentsDomain');
export const resetDomain = ChooseStudentsDomain.createEvent();

export const chooseStudentsInfo = createGetActionNodes<GetStudentsParams, ChooseStudentsInfo>(
  ChooseStudentsDomain,
  defaultStudentListInfo,
  'initial',
);

export const chooseStudentsInitialInfo = createGetActionNodes<GetStudentsParams, ChooseStudentsInfo>(
  ChooseStudentsDomain,
  defaultStudentListInfo,
  'initial',
);

export const $baseInfo = ChooseStudentsDomain.createStore<BaseInfo>({ groupId: '', planId: '' });
export const setBaseInfo = ChooseStudentsDomain.createEvent<BaseInfo>();

export const linkStudents = createAddActionNodes<{ groupId: string; studentIds: string[] }>(ChooseStudentsDomain);
export const closeConfirm = createConfirmNodes(LessonSettingsDomain);

export const $filter = ChooseStudentsDomain.createStore<string>('');
export const setFilter = ChooseStudentsDomain.createEvent<string>();
