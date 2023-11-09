import React from 'react';
import { Lesson } from '@src/pages/Lessons/model/types';
import { Icon } from '@kit-edu/icon';

type ScormCellProps = {
  data: Lesson;
};
export const ScormCell = ({ data }: ScormCellProps): JSX.Element => {
  if (data.elementType === 'group') return <></>;

  return (
    <>
      {data.itemInfo.hasContent ? (
        <Icon iconName="master-check" className="mx-auto text-[#21BA72]" />
      ) : (
        <Icon iconName="master-math-multiplication" className="mx-auto text-[#F43F5F]" />
      )}
    </>
  );
};
