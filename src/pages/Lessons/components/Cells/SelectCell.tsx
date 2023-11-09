import { Checkbox } from '@kit-edu/checkbox';
import React from 'react';
import { Lesson } from '@src/pages/Lessons/model/types';
import { useStore } from 'effector-react';
import { confirmLesson } from '@src/pages/Lessons/model';

type SelectCellProps = {
  data: Lesson;
};
export const SelectCell = ({ data }: SelectCellProps): JSX.Element => {
  const status = useStore(confirmLesson.$status);
  const changeHandler = () => {
    if (data.elementType === 'lesson') {
      confirmLesson.update({ lessonId: data.id, themeId: '', isAllowRegistration: data.itemInfo.isAllowRegistration });
    }
  };

  if (data.elementType === 'group') return <></>;

  const {
    itemInfo: { id, hasContent, isAllowRegistration },
  } = data;
  return (
    <Checkbox
      id={id}
      checked={isAllowRegistration}
      onChange={changeHandler}
      disabled={!hasContent || status === 'pending'}
      className="mx-auto"
    />
  );
};
