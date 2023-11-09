import { query } from '@src/gql-client';
import { LessonSettingExt } from '@src/pages/Lessons/model/types';

export const getActivityRowInfoByItemIdQuery = (itemId: string): LessonSettingExt => {
  const resp = query.readEduPlanActivityRows({
    where: {
      itemId: { _eq: itemId },
      deletedAt: { _is_null: true },
    },
  });

  if (!resp || resp.length === 0) throw new Error('Не удалось получить информацию');
  const item = resp[0];
  return {
    eduPlanId: item.eduPlanRow?.eduPlanId ?? '',
    eduPlanRowId: item.eduPlanRowId ?? '',
    id: '',
    implId: '',
    isAllowAlways: false,
    title: item.lesson?.title ?? '',
    endDate: '',
    passDate: '',
    startDate: '',
    isPublic: false,
    lessonId: itemId,
  };
};
