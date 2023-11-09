import { Typography } from '@kit-edu/typography';
import { Theme } from '@src/pages/LessonSettings/model/types';
import { EmptyLessonNotification, LessonInfo } from '@src/pages/LessonSettings/components';

type ThemeInfoProps = {
  theme: Theme;
};
export const ThemeInfo = ({ theme: { title, lessons } }: ThemeInfoProps) => {
  const hasConfirmedLessons = lessons.findIndex((e) => e.isAllowRegistration) !== -1;
  const hasLessons = lessons.length === 0;
  return (
    <div className="space-y-4" data-testid="themeBlock">
      <Typography as="h3" size="18px" fontWeight="semibold">
        {title}
      </Typography>
      {hasConfirmedLessons ? (
        lessons.filter((e) => e.isAllowRegistration).map((e) => <LessonInfo data-testid="lessonBlock" lesson={e} key={e.id} />)
      ) : (
        <EmptyLessonNotification type={hasLessons ? 'default' : 'active'} />
      )}
    </div>
  );
};
