import React from 'react';
import { ScrollArrow, UploadStudentsOnScroll, ViewStudentRow } from '@src/pages/LessonSettings/components';
import { Stream } from '@src/pages/LessonSettings/model/types';
import { $linkedStudentsFioFilter, linkedStudents } from '@src/pages/LessonSettings/model';
import { Student } from '@src/types';

type LinkedStudentsListProps = {
  items: Student[];
  stream: Stream;
};
export const LinkedStudentsList = ({ stream, items }: LinkedStudentsListProps) => {
  return (
    <>
      <ScrollArrow isDisabled={false} className="right-0 bottom-6">
        <div className="flex flex-col gap-y-2">
          {items.map((e) => (
            <ViewStudentRow data={e} key={e.id} stream={stream} />
          ))}
          <UploadStudentsOnScroll
            streamId={stream.lessonImplId}
            nodes={linkedStudents}
            filterStore={$linkedStudentsFioFilter}
          />
        </div>
      </ScrollArrow>
    </>
  );
};
