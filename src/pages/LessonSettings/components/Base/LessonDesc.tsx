import { TextBlock } from '@src/pages/LessonSettings/components/StreamInfo/Blocks';
import React from 'react';
import { ContentPanel } from '@src/pages/LessonSettings/components';

type LessonDescProps = {
  title: string;
  lessonKindCaption: string;
};
export const LessonDesc = ({ lessonKindCaption, title }: LessonDescProps) => {
  return (
    <div className="flex flex-col gap-5">
      <TextBlock label="Занятие" value={title} dataTestId="lessonTitle" />
      <TextBlock label="Вид занятия" value={lessonKindCaption} dataTestId="lessonKind" />
    </div>
  );
};

type LessonDescBlockProps = LessonDescProps;
export const LessonDescBlock = ({ lessonKindCaption, title }: LessonDescBlockProps) => {
  return (
    <ContentPanel variant="white">
      <LessonDesc title={title} lessonKindCaption={lessonKindCaption} />
    </ContentPanel>
  );
};
