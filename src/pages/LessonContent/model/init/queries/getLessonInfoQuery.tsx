import { Lesson, ScormVersions, ScormInfoApiVersions } from '@src/pages/LessonContent/model/types';
import { query } from '@src/gql-client';
import { castNotSkeletonDeep } from 'gqty';
import { arrayIncludes } from '@src/utils/validation/typing';

const apiVersions: ScormInfoApiVersions[] = Object.values(ScormVersions);

export const getLessonInfoQuery = (lessonId: string): Omit<Lesson, 'themeId' | 'planId' | 'activityId'> => {
  const resp = query.readEduLessons({
    where: {
      id: { _eq: lessonId },
      deletedAt: { _is_null: true },
    },
  });
  if (resp.length === 0) throw new Error('Не удалось получить данные');
  const item = resp[0];
  const { id, isAllowRegistration, title, scormPackage } = castNotSkeletonDeep(item);

  return {
    lessonId: id,
    isAllowRegistration,
    title,
    scormPackage: scormPackage
      ? {
          id: scormPackage.id,
          path: scormPackage.storageKey,
          entryPoint: scormPackage.entrypoint ? scormPackage.entrypoint : undefined,
          fileName: scormPackage.filename,
          createdAt: scormPackage.createdAt ? new Date(scormPackage.createdAt) : undefined,
          updatedAt: scormPackage.updatedAt ? new Date(scormPackage.updatedAt) : undefined,
          uploadedAt: scormPackage.uploadedAt ? new Date(scormPackage.uploadedAt) : undefined,
          userFullname: scormPackage.user_full_name ?? '',
          apiVersion: arrayIncludes(apiVersions, scormPackage.version) ? scormPackage.version : ScormVersions.FIRST,
        }
      : undefined,
  };
};
