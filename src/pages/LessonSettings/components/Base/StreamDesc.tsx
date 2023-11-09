import { TextBlock } from '@src/pages/LessonSettings/components/StreamInfo/Blocks';
import React from 'react';
import { ContentPanel } from '@src/pages/LessonSettings/components';

type StreamDescProps = {
  title: string;
  stream: string;
};
export const StreamDesc = ({ stream, title }: StreamDescProps) => {
  return (
    <div className="flex flex-col gap-5">
      <TextBlock label="Занятие" value={title} dataTestId="lessonTitle" />
      <TextBlock label="Поток" value={stream} dataTestId="lessonKind" />
    </div>
  );
};

type StreamDescBlockProps = StreamDescProps;
export const StreamDescBlock = ({ stream, title }: StreamDescBlockProps) => {
  return (
    <ContentPanel variant="white">
      <StreamDesc title={title} stream={stream} />
    </ContentPanel>
  );
};
