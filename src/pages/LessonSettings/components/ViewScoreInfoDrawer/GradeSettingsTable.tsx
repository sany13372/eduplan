import classNames from 'classnames';
import { Typography } from '@kit-edu/typography';
import upperFirst from 'lodash/upperFirst';
import { noun } from 'plural-ru';
import React from 'react';
import { GradeSettingItem as GradeSettingItemT } from '@src/pages/LessonSettings/model/types';

import styles from './Item.module.css';

type GradeSettingsItemProps = {
  el: GradeSettingItemT;
};

const GradeSettingItem = ({ el: { item, val } }: GradeSettingsItemProps) => {
  return (
    <div className={classNames('flex flex-col  grow divide-y divide-base-300 min-w-max', styles.item)}>
      <Typography className="px-4 py-3 min-w-max w-full" fontWeight="semibold" size="14px">
        {upperFirst(item.caption)}
      </Typography>
      <div className="flex flex-col px-4 py-3 min-w-max w-full">
        <Typography size="12px" color="medium">
          не менее
        </Typography>
        <Typography size="14px" fontWeight="semibold" className="text-base-700 ">
          {`${val} ${noun(val, 'балла', 'баллов', 'баллов')}`}
        </Typography>
      </div>
    </div>
  );
};

type GradeSettingsTableProps = {
  gradeSettings: GradeSettingItemT[];
};

export const GradeSettingsTable = ({ gradeSettings }: GradeSettingsTableProps) => {
  return (
    <div className="flex flex-row  overflow-x-auto pb-1">
      {gradeSettings.map((e) => (
        <GradeSettingItem key={e.item.id} el={e} />
      ))}
    </div>
  );
};
