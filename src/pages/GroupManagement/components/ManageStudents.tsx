import React, { FC } from 'react';
import { Typography } from '@kit-edu/typography';
import { Icon } from '@kit-edu/icon';
import { Button } from '@kit-edu/button';
import { groupManagementModalApi, groupStudents } from '@src/pages/GroupManagement/model';
import { DeleteStudentConfirmDialog } from '@src/pages/GroupManagement/components/DeleteStudentConfirmDialog';
import { ExcludeStudentConfirmDialog } from '@src/pages/GroupManagement/components/ExcludeStudentConfirmDialog';
import { EmptyStudentList, UploadStudentsOnScroll } from '@src/pages/GroupManagement/components';
import { useIsPossibleCreateStudent } from '@src/hooks';
import { useStore } from 'effector-react';

import { StudentCard } from './StudentCard';

export const ManageStudents: FC = () => {
  const isPossibleCreateStudent = useIsPossibleCreateStudent();
  const {
    data: students,
    pagination: { count },
  } = useStore(groupStudents.$value);

  const hasStudents = count > 0;
  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6" data-testid="studyCount">
          <div className="flex gap-2 items-center">
            <Typography as="h3" size="20px" fontWeight="semibold" color="dark">
              Обучающиеся
            </Typography>
            {hasStudents && (
              <>
                <Icon iconName="master-dot" size="10" className="text-green-500" />
                <Typography as="h3" size="14px" color="medium">
                  {count}
                </Typography>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button
              colorMode="onLight"
              size="medium"
              appearance="dark-outline"
              disabled={!isPossibleCreateStudent}
              onClick={() => groupManagementModalApi.openAddStudent()}
            >
              Добавить нового
            </Button>
            <Button
              colorMode="onLight"
              size="medium"
              appearance="dark-outline"
              onClick={() => groupManagementModalApi.openChooseStudent()}
            >
              Выбрать из списка
            </Button>
          </div>
        </div>

        {!hasStudents ? (
          <EmptyStudentList />
        ) : (
          <div className="flex flex-col">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
            <UploadStudentsOnScroll />
          </div>
        )}
      </div>
      <DeleteStudentConfirmDialog />
      <ExcludeStudentConfirmDialog />
    </>
  );
};
