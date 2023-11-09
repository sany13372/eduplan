import { StudentCard } from '@src/pages/StudentGroupList/components/StudentCard';
import { UploadStudentsOnScroll } from '@src/pages/StudentGroupList/components';
import React from 'react';
import { ShortUserInfo } from '@src/pages/StudentGroupList/model/types';

type StudentsInfoContentProps = {
  students: ShortUserInfo[];
  groupId: string;
};
export const StudentsInfoContent = ({ students, groupId }: StudentsInfoContentProps) => {
  return (
    <>
      {students.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
      <UploadStudentsOnScroll groupId={groupId} />
    </>
  );
};
