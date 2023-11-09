import { RoutingInfo } from '@src/types';

export const MFE_PATH = '/eduplan';

export enum MfeRoutes {
  EDU_PLAN_LIST = '/list',
  EDU_PLAN_CREATE = '/plan/create/program/:programId',

  EDU_PLAN_INFO_ROOT = '/plan/:planId',
  EDU_PLAN_INFO_VIEW = '/plan/:planId/view',
  EDU_PLAN_INFO_EDIT = '/plan/:planId/edit',

  EDU_PLAN_INFO_ACTIVITY_ROOT = '/plan/:planId/activity',
  EDU_PLAN_INFO_ACTIVITY_CREATE = '/plan/:planId/activity/element/:gridElementId/create',
  EDU_PLAN_INFO_ACTIVITY_EDIT = '/plan/:planId/activity/:activityId/edit',
  EDU_PLAN_INFO_ACTIVITY_INFO_ROOT = '/plan/:planId/activity/:activityId',
  EDU_PLAN_INFO_ACTIVITY_VIEW = '/plan/:planId/activity/:activityId/view',
  EDU_PLAN_INFO_ACTIVITY_LESSON_INFO = '/plan/:planId/activity/:activityId/lesson/view',
  EDU_PLAN_INFO_ACTIVITY_SETTINGS_INFO = '/plan/:planId/activity/:activityId/settings/view',

  EDU_PLAN_INFO_ACTIVITY_LESSON_ROOT = '/plan/theme/:themeId/lesson',
  EDU_PLAN_INFO_ACTIVITY_LESSON_CREATE = '/plan/theme/:themeId/lesson/create',
  EDU_PLAN_INFO_ACTIVITY_LESSON_EDIT = '/plan/theme/:themeId/lesson/:lessonId/edit',
  EDU_PLAN_INFO_ACTIVITY_LESSON_STUDENTS = '/plan/theme/:themeId/lesson/students/:implId',

  EDU_PLAN_INFO_LESSON_ROOT = '/plan/lesson',
  EDU_PLAN_INFO_LESSON_SETTINGS = '/plan/lesson/:lessonId/setting',
  EDU_PLAN_INFO_LESSON_STUDENTS_VIEW = '/plan/lesson/theme/:themeId/impl/:implId/students',
  EDU_PLAN_INFO_LESSON_STUDENTS_EDIT = '/plan/lesson/theme/:themeId/impl/:implId/students/edit',

  EDU_PLAN_INFO_ACTIVITY_GROUP_CREATE = '/plan/:planId/activity/element/:gridElementId/group/create',
  EDU_PLAN_INFO_ACTIVITY_GROUP_EDIT = '/plan/:planId/activity/group/:groupId/edit',

  EDU_PLAN_INFO_STUDENT_GROUP_LIST = '/plan/:planId/student-group/list',
  EDU_PLAN_INFO_STUDENT = '/plan/:planId/student/list',
  EDU_PLAN_INFO_STUDENT_CREATE = '/plan/:planId/student/create',

  EDU_PLAN_INFO_GROUP_LIST = '/plan/:planId/group/list',
  EDU_PLAN_INFO_GROUP_CREATE = '/plan/:planId/group/create',
  EDU_PLAN_INFO_GROUP_EDIT = '/plan/:planId/group/:groupId/edit',
  EDU_PLAN_INFO_GROUP_VIEW = '/plan/:planId/group/:groupId/view',

  ACTIVITY_TOPIC_ROOT = '/plan/:planId/activity/:activityId/topic',
  ACTIVITY_TOPIC_ITEM_CREATE = '/plan/:planId/activity/:activityId/topic/create',
  ACTIVITY_TOPIC_GROUP_CREATE = '/plan/:planId/activity/:activityId/topic/group/create',
  ACTIVITY_TOPIC_GROUP_OR_ITEM_EDIT = '/plan/:planId/activity/:activityId/topic/:topicId/edit',

  EDU_PLAN_INFO_IOT_TEMPLATE = '/plan/:planId/template',
  EDU_PLAN_INFO_IOT_TEMPLATE_MANAGEMENT = '/template',
  EDU_PLAN_INFO_IOT_TEMPLATE_CREATE = '/template/plan/:planId/element/:gridElementId/create',
  EDU_PLAN_INFO_IOT_TEMPLATE_EDIT = '/template/plan/:planId/element/:gridElementId/template/:iotTemplateId/edit',

  EDU_PLAN_INFO_IOT = '/plan/:planId/iot',
  EDU_PLAN_INFO_IOT_MANAGEMENT = '/iot',
  EDU_PLAN_INFO_IOT_CREATE = '/iot/plan/:planId/element/:gridElementId/create',

  LESSON_ROOT = '/lesson',
  LESSON_INFO_ROOT = '/lesson/:lessonId/info',
  LESSON_INFO_CONTENT = '/lesson/:lessonId/info/content',
  LESSON_INFO_TEST_CONSTRUCTOR = '/lesson/:lessonId/info/test-constructor',
  LESSON_INFO_CONTENT_CONSTRUCTOR = '/lesson/:lessonId/info/content-constructor',

  EVENT_ROOT = '/events',
  EVENT_VIEW = '/events/event/:eventId/view',
  EVENT_UPDATE_INFO = '/events/event/:eventId/update/info',
  EVENT_UPDATE_PARTICIPANTS = '/events/event/:eventId/update/participants',
  EVENT_CREATE = '/events/event/create',
  EDU_PLAN_EVENTS = '/plan/:planId/events',

  EDU_PLAN_TEACHERS = '/plan/:planId/teachers',
  EDU_PLAN_DESC_ROOT = '/plan/:planId/desc',
  EDU_PLAN_DESC_VIEW = '/plan/:planId/desc/view',
  EDU_PLAN_DESC_EDIT = '/plan/:planId/desc/edit',
}

export enum ExternalRoutes {
  SPACE_INFO = '/spaces/space/:id/info',
  EDUPROG_INFO = '/eduprog/program/:id/info/view',
  EDU_PLAN = '/eduprog/program/:id/plans',
  EVENTS = '/events/event/:eventId/view',
  STAFF_LIST = '/spaces/space/:id/staff',
}
export interface IdRouteParams {
  id: string;
}

export interface CreateProgramRouteParams {
  spaceId: string;
}

export interface ActivityRouteParams {
  activityId: string;
}

export interface TopicRouteParams {
  activityId: string;
  topicId: string;
}

export interface EduPlanParams {
  planId: string;
}

export interface IotParams {
  planId: string;
  gridElementId: string;
}

export interface IotUpdateParams {
  planId: string;
  gridElementId: string;
  iotTemplateId: string;
}

export interface EduPlanActivityParams {
  planId: string;
  activityId: string;
}

export interface ActivityGroupParams {
  planId: string;
  groupId: string;
}

export interface ThemeParams {
  themeId: string;
  lessonId?: string;
  implId: string;
}

export interface SettingsParams {
  lessonId: string;
}
export interface LessonParams {
  lessonId: string;
}

export interface EventParams {
  eventId: string;
}

export interface ImplParams {
  themeId: string;
  implId: string;
}

const formatPath = (route: string, params?: Record<string, string>, queryParams?: Record<string, string>): string => {
  if (!params) return route;
  let res: string = route;
  const keys = Object.keys(params);
  keys.forEach((e) => {
    res = res.replace(e, params[e]);
  });

  if (queryParams) {
    const formattedQueryParams = new URLSearchParams(queryParams).toString();
    res = `${res}?${formattedQueryParams}`;
  }

  return res;
};

// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
let _basePath = MFE_PATH;

export function setBasePath(path: string): void {
  _basePath = path;
}

function getBasePath() {
  return _basePath;
}

export function resetBasePath(): void {
  setBasePath(MFE_PATH);
}

export const getPath = (
  route: MfeRoutes,
  params?: Record<string, string>,
  queryParams?: Record<string, string>,
): string => `${getBasePath()}${formatPath(route, params, queryParams)}`;

export const getExtenalPath = (route: ExternalRoutes, params?: Record<string, string>): string =>
  formatPath(route, params);

export const defaultRoutingInfo: RoutingInfo = {
  label: 'К списку планов обучения',
  to: getPath(MfeRoutes.EDU_PLAN_LIST),
};
