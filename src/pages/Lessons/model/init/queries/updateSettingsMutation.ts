import { mutation } from '@src/gql-client';
import { LessonSettingExt } from '@src/pages/Lessons/model/types';
import { localeToServerDateString } from '@utils/date';

export const updateSettingsMutation = ({
  endDate,
  isAllowAlways,
  passDate,
  startDate,
  id,
}: LessonSettingExt): string => {
  const resp = mutation.editEduLessonImplWithSetting({
    lessonImplSetting: {
      implementationSettingId: id,
      isAllowAlways,
      startDate: !isAllowAlways && startDate ? localeToServerDateString(startDate) : null,
      endDate: !isAllowAlways && endDate ? localeToServerDateString(endDate) : null,
      passDate: passDate ? localeToServerDateString(passDate) : null,
    },
  });
  return resp?.id ?? '';
};
