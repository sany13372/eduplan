import { useStore } from 'effector-react';
import { lessonInfoStore } from '@src/pages/LessonContent/model';
import { Typography } from '@kit-edu/typography';
import { useMemo } from 'react';
import { EmptyScormInfo, ScormControlButtons, ScormInfo } from '@src/pages/LessonContent/components';
import { Content } from '@src/pages/LessonContent/model/types';

export const LessonContent = (): JSX.Element => {
  const lesson = useStore(lessonInfoStore.$value);
  const { title, scormPackage } = lesson;

  const hasContent = useMemo(() => !!scormPackage, [scormPackage]);
  return (
    <div className="flex flex-col space-y-8">
      <Typography as="h2" size="32px" fontWeight="semibold">
        {title}
      </Typography>
      <Typography as="h3" size="24px" fontWeight="semibold">
        SCORM пакет занятия
      </Typography>
      <div className="flex justify-end items-center">
        <ScormControlButtons lesson={lesson} />
      </div>
      {!hasContent ? <EmptyScormInfo /> : <ScormInfo scorm={scormPackage as Content} />}
    </div>
  );
};
