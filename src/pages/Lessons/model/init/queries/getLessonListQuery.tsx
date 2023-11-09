import { GetLessonListParams, Lesson, ObjCommon } from '@src/pages/Lessons/model/types';
import { order_by, query } from '@src/gql-client';
import { castNotSkeletonDeep } from 'gqty';
import { serverToLocalDateString } from '@utils/date';

export const getLessonListQuery = ({ eduPlanRowId, withoutGroups }: GetLessonListParams): Lesson[] => {
  const resp = query.readEduPlanActivityRows({
    where: {
      eduPlanRowId: { _eq: eduPlanRowId },
      deletedAt: { _is_null: true },
    },
    order_by: [{ priority: order_by.desc_nulls_first }],
  });
  const lessons: Lesson[] = [];
  resp.map(castNotSkeletonDeep).forEach(({ id, lesson, path, partGroup, part }) => {
    const commonInfo: ObjCommon = {
      id,
      elementType: 'group',
      path,
    };
    if (partGroup && !withoutGroups) {
      const { id: groupId, title: groupTitle, eduPlanActivityComponentKindSetting } = partGroup;

      lessons.push({
        ...commonInfo,
        elementType: 'group',
        groupInfo: {
          id: groupId,
          title: groupTitle,
          objType: {
            title: eduPlanActivityComponentKindSetting?.eduPlanActivityComponentKind?.title ?? '',
            shortTitle: eduPlanActivityComponentKindSetting?.eduPlanActivityComponentKind?.shortTitle ?? '',
            systemCode: eduPlanActivityComponentKindSetting?.eduPlanActivityComponentKind?.systemCode ?? '',
          },
          childrens: [],
        },
      });
    }
    if (part) {
      const { id: themeId, title: themeTitle } = part;

      lessons.push({
        ...commonInfo,
        elementType: 'group',
        groupInfo: {
          id: themeId,
          title: themeTitle,
          childrens: [],
        },
      });
    }
    if (lesson) {
      const { id: itemId, title: itemTitle, isAllowRegistration, scormId, kind, implementations } = lesson;
      const implArray = implementations();
      let settings;
      let studentCount;
      let isPublic = false;
      let implId = '';
      if (implArray && implArray.length > 0) {
        const setingsArray = implArray[0].settings();
        settings = setingsArray.length > 0 ? setingsArray[0] : undefined;
        studentCount = implArray[0]
          ?.lesson2StudentRelations_aggregate({ where: { deletedAt: { _is_null: true } } })
          ?.aggregate?.count();
        isPublic = implArray[0].isPublic;
        implId = implArray[0].id;
      }
      lessons.push({
        ...commonInfo,
        elementType: 'lesson',
        itemInfo: {
          id: itemId,
          title: itemTitle,
          eduKind: {
            id: kind?.themeLessonKind?.id ?? '',
            caption: kind?.themeLessonKind?.shortTitle ?? '',
          },
          isAllowRegistration: Boolean(isAllowRegistration),
          hasContent: Boolean(scormId),
          settings: settings
            ? {
                id: settings.id,
                isPublic,
                implId,
                isAllowAlways: settings.isAllowAlways,
                startDate: settings.startDate ? serverToLocalDateString(settings.startDate) : undefined,
                endDate: settings.endDate ? serverToLocalDateString(settings.endDate) : undefined,
                passDate: settings.passDate ? serverToLocalDateString(settings.passDate) : undefined,
                studentCount: studentCount ?? 0,
              }
            : undefined,
        },
      });
    }
  });
  return lessons;
};
