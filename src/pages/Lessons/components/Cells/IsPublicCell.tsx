import React from 'react';
import { Lesson } from '@src/pages/Lessons/model/types';
import { publicateLesson } from '@src/pages/Lessons/model';
import { useStore } from 'effector-react';
import { Checkbox } from '@kit-edu/checkbox';

type IsPublicCellProps = {
  data: Lesson;
};
export const IsPublicCell = ({ data }: IsPublicCellProps): JSX.Element => {
  const status = useStore(publicateLesson.$status);
  const changeHandler = () => {
    if (data.elementType === 'lesson' && data.itemInfo.settings) publicateLesson.update(data);
  };

  if (data.elementType === 'group') return <></>;

  const {
    itemInfo: { id, settings },
  } = data;
  return (
    <>
      {Boolean(settings) && (
        <Checkbox
          id={`${id}_public`}
          checked={settings?.isPublic ?? false}
          onChange={changeHandler}
          disabled={!settings || status === 'pending'}
          className="mx-auto"
        />
      )}
    </>
  );
};
