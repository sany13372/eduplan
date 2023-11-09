import React from 'react';
import { ScrollArrow, ViewTeacherRow } from '@src/pages/LessonSettings/components';
import { Stream } from '@src/pages/LessonSettings/model/types';
import { Teacher } from '@src/types';

type LinkedTeacherListProps = {
  items: Teacher[];
  stream: Stream;
};
export const LinkedTeacherList = ({ stream, items }: LinkedTeacherListProps) => {
  return (
    <ScrollArrow isDisabled={false} className="right-0 bottom-6">
      <div className="flex flex-col gap-y-2">
        {items.map((e) => (
          <ViewTeacherRow data={e} key={e.id} stream={stream} />
        ))}
      </div>
    </ScrollArrow>
  );
};
