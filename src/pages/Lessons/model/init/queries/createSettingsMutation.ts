import { mutation } from '@src/gql-client';
import { LessonSettingExt } from '@src/pages/Lessons/model/types';
import { localeToServerDateString } from '@utils/date';

export const createSettingsMutation = ({
  endDate,
  isAllowAlways,
  passDate,
  startDate,
  lessonId,
}: LessonSettingExt): string => {
  const resp = mutation.addEduLessonImplWithSetting({
    lessonImplSetting: {
      eduLessonId: lessonId,
      isAllowAlways,
      startDate: !isAllowAlways && startDate ? localeToServerDateString(startDate) : null,
      endDate: !isAllowAlways && endDate ? localeToServerDateString(endDate) : null,
      passDate: passDate ? localeToServerDateString(passDate) : null,
    },
  });
  return resp?.id ?? '';
};
