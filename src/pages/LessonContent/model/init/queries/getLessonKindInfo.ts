import { LessonKindInfo } from '@src/pages/LessonContent/model/types';
import { query } from '@src/gql-client';
import { WidgetBaseType, WidgetInteractiveType, WidgetMediaType } from '@sbo/content-constructor';

export const getLessonKindInfo = (lessonId: string): LessonKindInfo => {
  const resp = query.getLessonKindInfo({ lessonId });

  return {
    lessonId,
    configuration: {
      base: resp?.configuration?.base?.filter((config): config is WidgetBaseType => true) || [],
      media: resp?.configuration?.media?.filter((config): config is WidgetMediaType => true) || [],
      interactive: resp?.configuration?.interactive?.filter((config): config is WidgetInteractiveType => true) || [],
    },
  };
};
