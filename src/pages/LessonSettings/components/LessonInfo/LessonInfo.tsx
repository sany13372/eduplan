import { Accordion } from '@sber-universe/om-component-library';
import { Lesson } from '@src/pages/LessonSettings/model/types';
import React from 'react';
import { useStreamCount } from '@src/pages/LessonSettings/model/hooks';

import { Content } from './Content';
import { Panel } from './Panel';

type LessonInfoProps = {
  lesson: Lesson;
};
export const LessonInfo = ({ lesson }: LessonInfoProps) => {
  const { id } = lesson;
  const { streamCount, activeStreamCount } = useStreamCount(id);
  const isDefaultExpanded = streamCount === 0;

  return (
    <Accordion params={{ defaultExpanded: isDefaultExpanded }} dataTestId="lessonBlock">
      <Panel lesson={lesson} streamCount={streamCount} />
      <Content id={id} streamCount={streamCount} activeStreamCount={activeStreamCount} />
    </Accordion>
  );
};
