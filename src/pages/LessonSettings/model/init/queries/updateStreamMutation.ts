import { Stream } from '@src/pages/LessonSettings/model/types';
import { mutation } from '@src/gql-client';
import { isNotEmpty } from '@utils/typescriptUtils';
import { eduSettingToStream } from '@src/pages/LessonSettings/model/mappers';
import { formatISO } from 'date-fns';

export const updateStreamMutation = ({
  lessonId,
  themeId,
  title,
  isAllowAlways,
  passDate,
  startDate,
  endDate,
  id,
}: Stream): Stream => {
  const resp = mutation.editEduLessonImplWithSetting({
    lessonImplSetting: {
      implementationSettingId: id,
      title: title.trim(),
      isAllowAlways,
      passDate: passDate ? formatISO(passDate) : undefined,
      startDate: !isAllowAlways && startDate ? formatISO(startDate) : undefined,
      endDate: !isAllowAlways && endDate ? formatISO(endDate) : undefined,
    },
  });
  if (!isNotEmpty(resp)) throw new Error('Update stream error');
  return eduSettingToStream(themeId, lessonId, resp);
};
