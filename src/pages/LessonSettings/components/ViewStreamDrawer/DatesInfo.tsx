import { Typography } from '@kit-edu/typography';
import { DateBlock } from '@src/pages/LessonSettings/components/StreamInfo/Blocks';
import React from 'react';
import { ContentPanel, OpenDrawerButton } from '@src/pages/LessonSettings/components';
import { Stream } from '@src/pages/LessonSettings/model/types';
import classNames from 'classnames';

import styles from './DatesInfo.module.css';

type DatesInfoProps = {
  stream: Stream;
};
export const DatesInfo = ({ stream }: DatesInfoProps) => {
  return (
    <ContentPanel variant="white" className={classNames(styles.datesInfo, 'px-6 pb-6 pt-[18px]')} data-testid="dateBlock">
      <div className={styles.desc}>
        <Typography as="h4" size="16px" fontWeight="semibold">
          Даты
        </Typography>
        <OpenDrawerButton type="UPDATE_STREAM_DATES" val={stream} />
      </div>

      <div className={styles.content}>
        <DateBlock label="Начало" value={stream.startDate} defaultValue="Не ограничено" dataTestId="startDate"/>
        <DateBlock label="Окончание" value={stream.endDate} defaultValue="Не ограничено" dataTestId="endDate"/>
        <DateBlock label="Срок сдачи" value={stream.passDate} defaultValue="Не указан" dataTestId="passDate"/>
      </div>
    </ContentPanel>
  );
};
