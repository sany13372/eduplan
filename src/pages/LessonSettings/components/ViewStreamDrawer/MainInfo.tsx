import { TextBlock } from '@src/pages/LessonSettings/components/StreamInfo/Blocks';
import { ContentPanel, LessonDesc, OpenDrawerButton, StreamStatus } from '@src/pages/LessonSettings/components';
import React from 'react';
import { Lesson, Stream } from '@src/pages/LessonSettings/model/types';

import styles from './MainInfo.module.css';
import { ToggleIsPublButton } from './ToggleIsPublButton';

type MainInfoProps = {
  lesson: Lesson;
  stream: Stream;
};
export const MainInfo = ({ stream, lesson }: MainInfoProps) => {
  return (
    <ContentPanel variant="white" className={styles.mainInfo}>
      <div className={styles.lessonInfoBlock}>
        <LessonDesc title={lesson.title} lessonKindCaption={lesson.lessonKind.caption} />
        <ToggleIsPublButton stream={stream} />
      </div>
      <ContentPanel className={styles.streamInfoBlock} data-testid="streamBlock">
        <div className={styles.streamInfo}>
          <TextBlock label="Поток" value={stream.title} />
          <StreamStatus isPublic={stream.isPublic} />
        </div>
        <OpenDrawerButton type="UPDATE_STREAM_TITLE" val={stream} />
      </ContentPanel>
    </ContentPanel>
  );
};
