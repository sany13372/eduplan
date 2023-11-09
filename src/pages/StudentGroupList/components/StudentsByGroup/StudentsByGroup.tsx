import React, { FC } from 'react';
import { EmptyFilteredStudentsList, GroupDisclosure } from '@src/pages/StudentGroupList/components';
import { useStore } from 'effector-react';
import { $studentNameFilter, groupStudentsMap } from '@src/pages/StudentGroupList/model';
import { useFilteredGroups, useHasGroups, useHasStudents } from '@src/pages/StudentGroupList/model/hooks';

import { StudentsInfoContent } from './StudentsInfoContent';

export const StudentsByGroup: FC = () => {
  const groups = useFilteredGroups();
  const groupInfoMap = useStore(groupStudentsMap.$value);
  const filterValue = useStore($studentNameFilter);
  const hasStudents = useHasStudents();
  const hasGroups = useHasGroups();
  const hasFilter = !!filterValue;
  return (
    <>
      {hasFilter && !hasStudents ? (
        <EmptyFilteredStudentsList />
      ) : (
        <div>
          {groups.map((group) => {
            const item = groupInfoMap[group.id];
            if (!item) return null;

            return (
              <>
                {!hasGroups ? (
                  <StudentsInfoContent students={item.students} groupId={group.id} />
                ) : (
                  <GroupDisclosure
                    group={group}
                    key={group.id}
                    students={item.students}
                    studentsCount={item.pagination.count}
                  />
                )}
              </>
            );
          })}
        </div>
      )}
    </>
  );
};
