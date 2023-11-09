import React from 'react';
import { Disabled } from '@src/components';
import { Stream } from '@src/pages/LessonSettings/model/types';
import { ContentPanel, StreamStatus } from '@src/pages/LessonSettings/components';
import { Typography } from '@kit-edu/typography';
import { setDrawerInfo } from '@src/pages/LessonSettings/model';

import { ActionMenu } from './ActionMenu';
import { TextBlock, DateBlock } from './Blocks';
import styles from './StreamInfo.module.css';

type StreamInfoProps = {
  stream: Stream;
};
export const StreamInfo = ({ stream }: StreamInfoProps) => {
  const { title, studentCount, teacherList, isPublic, endDate, startDate, passDate } = stream;
  const onPanelClick = () => {
    setDrawerInfo({
      type: 'VIEW_STREAM',
      val: { id: stream.id, lessonId: stream.lessonId, themeId: stream.themeId },
    });
  };
  return (
    <Disabled isDisabled={false} className={styles.card} onClick={onPanelClick}>
      <div className={styles.titleGroup}>
        <Typography size="14px" fontWeight="semibold">
          {title}
        </Typography>
        <StreamStatus isPublic={isPublic} />
      </div>
      <div className={styles.contentGroup}>
        <div className="flex gap-2">
          <ContentPanel>
            <TextBlock label="Обучающиеся" value={studentCount} />
          </ContentPanel>
          <ContentPanel>
            <TextBlock label="Проверяющие" value={teacherList.length} />
          </ContentPanel>
          <ContentPanel className="flex gap-[30px]">
            <DateBlock label="Начало" value={startDate} defaultValue="Не ограничено" />
            <DateBlock label="Окончание" value={endDate} defaultValue="Не ограничено" />
            <DateBlock label="Срок сдачи" value={passDate} defaultValue="Не указан" />
          </ContentPanel>
        </div>
        <ActionMenu data={stream} />
      </div>
    </Disabled>
  );
};
