import { Stream } from '@src/pages/LessonSettings/model/types';
import { ColorBadge, ColorBadgeProps } from '@sber-universe/om-component-library';

export const StreamStatus = ({ isPublic }: Pick<Stream, 'isPublic'>) => {
  const text = isPublic ? 'Запущен' : 'Не запущен';
  const appearance: ColorBadgeProps['appearance'] = isPublic ? 'success' : 'warning';
  return <ColorBadge className="w-max" text={text} appearance={appearance} size="medium" />;
};
