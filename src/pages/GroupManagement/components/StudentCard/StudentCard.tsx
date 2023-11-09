import React, { FC } from 'react';
import { Avatar } from '@kit-edu/avatar';
import { Icon } from '@kit-edu/icon';
import { StudentInfo } from '@src/pages/GroupManagement/model/types';

import { StudentCardMenu } from './StudentCardMenu';

interface StudentCardProps {
  student: StudentInfo;
}

export const StudentCard: FC<StudentCardProps> = ({ student }) => (
  <div
    className="flex bg-white py-3 px-6 w-full justify-between rounded-md items-center mt-2"
    data-testid="studentCard"
  >
    <Avatar person={student.fio} subline={student.email} />
    <div className="flex gap-5 justify-center">
      {student.bookNumber && (
        <div className="px-3 text-xs py-2 bg-base-100 flex items-center rounded-md">
          <Icon className="mr-2 text-[#21BA72]" iconName="master-book" />
          {student.bookNumber}
        </div>
      )}
      <StudentCardMenu student={student} />
    </div>
  </div>
);
