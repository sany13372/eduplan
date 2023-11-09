import React from 'react';
import { useStore } from 'effector-react';
import { LinkTeacherRow } from '@src/pages/LessonSettings/components';
import { unlinkedTeachers } from '@src/pages/LessonSettings/model';

export const TeachersList = () => {
  const teachers = useStore(unlinkedTeachers.$value);

  return (
    <div className="flex flex-col gap-y-2">
      {teachers.map((e) => (
        <LinkTeacherRow data={e} key={e.id} />
      ))}
    </div>
  );
};
