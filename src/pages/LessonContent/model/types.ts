import { ScormInfo } from '@sber-universe/om-component-library';
import { WidgetsConfigurationProps } from '@sbo/content-constructor';

export type Lesson = {
  activityId: string;
  lessonId: string;
  themeId: string;
  planId: string;
  title: string;
  isAllowRegistration: boolean;
  scormPackage?: Content;
};

export type ScormInfoApiVersions = ScormInfo['apiVersion'];

export type Content = {
  id: string;
  path: string;
  fileName: string;
  entryPoint?: string;
  createdAt?: Date;
  updatedAt?: Date;
  uploadedAt?: Date;
  apiVersion: ScormInfoApiVersions;
  userFullname: string;
};

export type LessonKindInfo = {
  lessonId: string;
  configuration: WidgetsConfigurationProps;
};

export type UploadScormParams = {
  lessonId: string;
  scormPackageFile: File;
};

export type ScormVersionInfo = {
  apiVersion: ScormVersions.FIRST | ScormVersions.SECOND;
};

export enum ScormVersions {
  FIRST = '1.2',
  SECOND = '2004',
}
