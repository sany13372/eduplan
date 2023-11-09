import React, { FC } from 'react';
import { Avatar } from '@kit-edu/avatar';
import { Icon } from '@kit-edu/icon';
import { StudentInfo } from '@src/types';
import { CheckBoxGroup } from '@sber-universe/om-component-library';

const BadgeWrapper: FC = ({ children }) => (
  <div className="px-3 text-xs py-2 bg-base-100 flex items-center rounded-md">{children}</div>
);

interface StudentCardProps {
  student: StudentInfo;
}

export const StudentCard: FC<StudentCardProps> = ({ student }) => (
  <div
    className="flex bg-white py-3 px-6 w-full justify-between rounded-md items-center mt-2"
    data-testid="studentCard"
  >
    <div className="flex gap-2 items-center">
      <CheckBoxGroup name="checkedStudents" options={[{ id: student.id, caption: '' }]} />
      <Avatar person={student.fio} subline={student.email} />
    </div>
    <div className="flex gap-5 justify-center">
      <BadgeWrapper>{student.course === '' ? '-' : student.course}</BadgeWrapper>
      <BadgeWrapper>
        <Icon style={{ color: '#21BA72' }} className="mr-2" iconName="master-card" />
        {student.financingSource.shortTitle}
      </BadgeWrapper>
      <BadgeWrapper>
        <Icon style={{ color: '#21BA72' }} className="mr-2" iconName="master-book" />
        {student.bookNumber === '' ? '-' : student.bookNumber}
      </BadgeWrapper>
    </div>
  </div>
);
