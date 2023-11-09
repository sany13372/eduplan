import React from 'react';
import { LinkStudentRow, ScrollArrow, UploadStudentsOnScroll } from '@src/pages/LessonSettings/components';
import { Student } from '@src/types';
import { $unlinkedStudentsFioFilter, unlinkedStudents } from '@src/pages/LessonSettings/model';

type StudentsListProps = {
  students: Student[];
  streamId: string;
};
export const StudentsList = ({ students, streamId }: StudentsListProps) => {
  return (
    <div className=" relative">
      <ScrollArrow isDisabled={false} className="right-0 bottom-6">
        <div className="flex flex-col gap-y-2 ">
          {students.map((e) => (
            <LinkStudentRow data={e} key={e.id} />
          ))}
          <UploadStudentsOnScroll
            streamId={streamId}
            nodes={unlinkedStudents}
            filterStore={$unlinkedStudentsFioFilter}
          />
        </div>
      </ScrollArrow>
    </div>
  );
};
