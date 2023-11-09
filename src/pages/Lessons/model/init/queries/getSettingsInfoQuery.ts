import { query } from '@src/gql-client';
import { LessonSettingExt } from '@src/pages/Lessons/model/types';
import { castNotSkeletonDeep } from 'gqty';
import { serverToLocalDateString } from '@utils/date';

export const getSettingsInfoQuery = (settingId: string, settingsData: LessonSettingExt): LessonSettingExt => {
  const resp = query.readEduLessonImplementations({
    where: {
      settings: {
        id: { _eq: settingId },
        deletedAt: { _is_null: true },
      },
      deletedAt: { _is_null: true },
    },
  });

  if (!resp || resp.length === 0) throw new Error('Не удалось получить информацию');
  const { id: implId, settings } = castNotSkeletonDeep(resp[0]);
  const settingsObjList = settings({
    where: {
      id: { _eq: settingId },
      deletedAt: { _is_null: true },
    },
  });
  if (!settingsObjList || settingsObjList.length === 0) throw new Error('Не удалось получить информацию');
  const { id, passDate = '', startDate = '', endDate = '', isAllowAlways } = settingsObjList[0];
  return {
    ...settingsData,
    id,
    implId,
    startDate: startDate ? serverToLocalDateString(startDate) : '',
    endDate: endDate ? serverToLocalDateString(endDate) : '',
    passDate: passDate ? serverToLocalDateString(passDate) : '',
    isAllowAlways: Boolean(isAllowAlways),
  };
};
