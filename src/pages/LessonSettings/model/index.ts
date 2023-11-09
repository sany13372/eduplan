import { createDomain } from 'effector';
import { Reference, Teacher } from '@src/types';
import { allThemeFilter, defaultStudentsData } from '@src/pages/LessonSettings/model/constants';
import {
  ActivityInitData,
  CommonInfo,
  DrawerInfoMap,
  GetStudentsDataParams,
  GradeElement,
  LinkStudentsData,
  LinkTeachersData,
  ReferenceExt,
  ScoreInfo,
  ScoreInfoMap,
  SetDrawerInfoParams,
  Stream,
  StreamMap,
  StudentsData,
  Theme,
  UnlinkStudentData,
  UnlinkTeachersData,
} from '@src/pages/LessonSettings/model/types';
import { status } from 'patronum';
import {
  createAddActionNodes,
  createConfirmNodes,
  createDeleteActionNodes,
  createGetActionNodes,
  createReferenceListNodes,
} from '@utils/effector';

export const LessonSettingsDomain = createDomain('LessonSettingsDomain');
export const resetDomain = LessonSettingsDomain.createEvent();

export const $commonInfo = LessonSettingsDomain.createStore<CommonInfo>({
  planId: '',
  activityId: '',
  hasIot: true,
  hasStudents: true,
  hasTeachers: true,
});
export const setCommonInfo = LessonSettingsDomain.createEvent<{ planId: string; activityId: string }>();

export const $themeListStore = LessonSettingsDomain.createStore<Theme[]>([]);
export const $streamMapStore = LessonSettingsDomain.createStore<StreamMap>({});
export const $scoreInfoMapStore = LessonSettingsDomain.createStore<ScoreInfoMap>({});
export const $filterItemListStore = LessonSettingsDomain.createStore<Reference[]>([allThemeFilter]);
export const $selectedFilterItemStore = LessonSettingsDomain.createStore<Reference>(allThemeFilter);

export const setFilterItem = LessonSettingsDomain.createEvent<Reference>();

export const getInitData = LessonSettingsDomain.createEvent<string>();
export const getInitDataFx = LessonSettingsDomain.createEffect<string, ActivityInitData>();
export const $getInitDataStatus = status({ effect: getInitDataFx, defaultValue: 'pending' }).reset(resetDomain);

export const $drawerInfoMapStore = LessonSettingsDomain.createStore<DrawerInfoMap>({
  CREATE_STREAM: null,
  VIEW_STREAM: null,
  UPDATE_STREAM_TITLE: null,
  UPDATE_STREAM_DATES: null,
  VIEW_SCORE_INFO: null,
  UPDATE_SCORE_INFO: null,
  LINK_STUDENTS: null,
  LINK_TEACHERS: null,
  VIEW_LINKED_STUDENTS: null,
  VIEW_LINKED_TEACHERS: null,
});
export const setDrawerInfo = LessonSettingsDomain.createEvent<SetDrawerInfoParams>();

export const createStream = LessonSettingsDomain.createEvent<Stream>();
export const createStreamFx = LessonSettingsDomain.createEffect<Stream, Stream>();
export const $createStreamErrorsStore = LessonSettingsDomain.createStore<Record<string, string>>({});
export const resetCreateStreamErrors = LessonSettingsDomain.createEvent();
export const $createStreamStatus = status({ effect: createStreamFx, defaultValue: 'initial' }).reset(resetDomain);
export const confirmCreateStreamDrawerClose = createConfirmNodes(LessonSettingsDomain);

export const toggleStreamIsPubl = LessonSettingsDomain.createEvent<Stream>();
export const toggleStreamIsPublFx = LessonSettingsDomain.createEffect<Stream, Stream>();
export const $toggleStreamIsPublStatus = status({ effect: toggleStreamIsPublFx, defaultValue: 'initial' }).reset(
  resetDomain,
);

export const updateStream = LessonSettingsDomain.createEvent<{ val: Stream; successMessage: string }>();
export const updateStreamFx = LessonSettingsDomain.createEffect<{ val: Stream; successMessage: string }, Stream>();
export const $updateStreamErrorsStore = LessonSettingsDomain.createStore<Record<string, string>>({});
export const resetUpdateStreamErrors = LessonSettingsDomain.createEvent();
export const $updateStreamStatus = status({ effect: updateStreamFx, defaultValue: 'initial' }).reset(resetDomain);
export const confirmUpdateStreamTitleDrawerClose = createConfirmNodes(LessonSettingsDomain);
export const confirmUpdateStreamDatesDrawerClose = createConfirmNodes(LessonSettingsDomain);

export const deleteStream = createDeleteActionNodes<Stream>(LessonSettingsDomain);

export const scaleTypesStore = createReferenceListNodes<void, ReferenceExt>(LessonSettingsDomain);
export const scaleElementTypesStore = createReferenceListNodes<void, GradeElement>(LessonSettingsDomain);
export const controlFormStore = createReferenceListNodes<void, ReferenceExt>(LessonSettingsDomain);

export const saveScoreInfo = LessonSettingsDomain.createEvent<ScoreInfo>();
export const saveScoreInfoFx = LessonSettingsDomain.createEffect<ScoreInfo, ScoreInfo>();
export const $saveScoreInfoErrorsStore = LessonSettingsDomain.createStore<Record<string, string>>({});
export const resetSaveScoreInfoErrors = LessonSettingsDomain.createEvent();
export const $saveScoreInfoStatus = status({ effect: saveScoreInfoFx, defaultValue: 'initial' }).reset(resetDomain);
export const confirmUpdateScoreInfoDrawerClose = createConfirmNodes(LessonSettingsDomain);

export const deleteScoreInfo = createDeleteActionNodes<ScoreInfo>(LessonSettingsDomain);

export const unlinkedTeachers = createGetActionNodes<string, Teacher[]>(LessonSettingsDomain, []);
export const linkedTeachers = createGetActionNodes<string, Teacher[]>(LessonSettingsDomain, []);

export const linkTeachers = createAddActionNodes<LinkTeachersData>(LessonSettingsDomain);
export const confirmLinkTeacherDrawerClose = createConfirmNodes(LessonSettingsDomain);

export const deleteLinkedTeacher = createDeleteActionNodes<UnlinkTeachersData>(LessonSettingsDomain);

export const availableToLinkTeachersCount = createGetActionNodes<string, number>(LessonSettingsDomain, 0);

export const unlinkedStudents = createGetActionNodes<GetStudentsDataParams, StudentsData>(
  LessonSettingsDomain,
  defaultStudentsData,
  'initial',
);
export const initialUnlinkedStudents = createGetActionNodes<
  Pick<GetStudentsDataParams, 'filter' | 'streamId'>,
  StudentsData
>(LessonSettingsDomain, defaultStudentsData, 'initial');
export const $unlinkedStudentsFioFilter = LessonSettingsDomain.createStore<string>('');
export const setUnlinkedStudentsFioFilter = LessonSettingsDomain.createEvent<string>();

export const confirmLinkStudentDrawerClose = createConfirmNodes(LessonSettingsDomain);
export const linkStudents = createAddActionNodes<LinkStudentsData>(LessonSettingsDomain);

export const $linkedStudentsFioFilter = LessonSettingsDomain.createStore<string>('');
export const setLinkedStudentsFioFilter = LessonSettingsDomain.createEvent<string>();

export const linkedStudents = createGetActionNodes<GetStudentsDataParams, StudentsData>(
  LessonSettingsDomain,
  defaultStudentsData,
  'initial',
);
export const initialLinkedStudents = createGetActionNodes<
  Pick<GetStudentsDataParams, 'filter' | 'streamId'>,
  StudentsData
>(LessonSettingsDomain, defaultStudentsData, 'initial');
export const deleteLinkedStudent = createDeleteActionNodes<UnlinkStudentData>(LessonSettingsDomain);
export const availableToLinkStudentsCount = createGetActionNodes<string, number>(LessonSettingsDomain, 0);
export const studentEduplanCounts = createGetActionNodes<string, number>(LessonSettingsDomain, 0);
