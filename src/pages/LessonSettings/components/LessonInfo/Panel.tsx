import { Accordion, DotDividersContainer } from '@sber-universe/om-component-library';
import { Typography } from '@kit-edu/typography';
import React from 'react';
import { Lesson, StreamCountObj } from '@src/pages/LessonSettings/model/types';
import { noun } from 'plural-ru';
import { useScoreInfo } from '@src/pages/LessonSettings/model/hooks';

import { ButtonGroup } from './ButtonGroup';

const SecondaryInfo: React.FC = ({ children }) => {
  return (
    <Typography as="span" size="12px" className="text-base-500">
      {children}
    </Typography>
  );
};
type StreamCountInfoProps = { streamCount: number };
const StreamCountInfo = ({ streamCount }: StreamCountInfoProps) => {
  const validWordForm = noun(streamCount, 'поток', 'потока', 'потоков');
  const text = `${streamCount} ${validWordForm}`;
  return <SecondaryInfo>{text}</SecondaryInfo>;
};
type PanelProps = {
  lesson: Lesson;
  streamCount: StreamCountObj['streamCount'];
};

export const Panel = ({ lesson: { title, lessonKind, id, themeId }, streamCount }: PanelProps) => {
  const streamListIsEmpty = streamCount === 0;
  const streamCountIsVisible = !streamListIsEmpty;
  const scoreInfo = useScoreInfo(id);
  return (
    <Accordion.Panel>
      <Accordion.ToggleButton disabled={streamListIsEmpty} />
      <div className="flex flex-col gap-y-1.5 grow">
        <Typography as="h4" size="16px" fontWeight="semibold">
          {title}
        </Typography>
        <DotDividersContainer>
          {streamCountIsVisible && <StreamCountInfo streamCount={streamCount} />}
          <SecondaryInfo> {lessonKind.caption}</SecondaryInfo>
          {scoreInfo && <SecondaryInfo>С оценкой </SecondaryInfo>}
        </DotDividersContainer>
      </div>
      <ButtonGroup id={id} themeId={themeId} lessonKind={lessonKind} />
    </Accordion.Panel>
  );
};
