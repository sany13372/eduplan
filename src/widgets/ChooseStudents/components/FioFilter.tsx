import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { TextFilter } from '@src/components';
import { $baseInfo, chooseStudentsInitialInfo } from '@src/widgets/ChooseStudents/model';
import debounce from 'lodash/debounce';
import { defaultStudentListInfo } from '@src/widgets/ChooseStudents/model/constants';
import { useStore } from 'effector-react';
import { useBackgroundClassName } from '@utils/hooks';
import classnames from 'classnames';

const setFilterDebounced = debounce(chooseStudentsInitialInfo.get, 300);
export const FioFilter: FC = () => {
  const [val, setVal] = useState('');
  const baseInfo = useStore($baseInfo);
  const setFilterVal = (e: ChangeEvent<HTMLInputElement>) => setVal(e.target.value);
  const resetFilterVal = () => setVal('');
  const bgClassName = useBackgroundClassName();
  useEffect(() => {
    setFilterDebounced({
      baseInfo: { groupId: baseInfo.groupId, planId: baseInfo.planId },
      filter: val,
      data: defaultStudentListInfo,
    });
  }, [baseInfo.groupId, baseInfo.planId, val]);
  return (
    <div className={classnames(bgClassName, 'sticky-top z-10')}>
      <TextFilter
        value={val}
        className="max-w-xs mb-6"
        placeholder="Поиск по ФИО"
        onChange={setFilterVal}
        clearable
        onClearInput={resetFilterVal}
      />
    </div>
  );
};
