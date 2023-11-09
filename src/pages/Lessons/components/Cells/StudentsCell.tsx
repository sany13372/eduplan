import React from 'react';
import { Lesson } from '@src/pages/Lessons/model/types';
import { Link } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';

type StudentsCellProps = {
  data: Lesson;
};

export const StudentsCell = ({ data }: StudentsCellProps): JSX.Element => {
  if (data.elementType === 'group') return <></>;

  const {
    itemInfo: { settings },
  } = data;

  const path = getPath(MfeRoutes.EDU_PLAN_INFO_LESSON_STUDENTS_VIEW, {
    ':themeId': data.id,
    ':implId': settings?.implId ?? '',
  });

  return (
    <>
      {settings && settings.studentCount > 0 && (
        <Link to={path} className="text-informative underline text-center block truncate">
          {settings.studentCount}
        </Link>
      )}
    </>
  );
};
