import { Stream } from '@src/pages/LessonSettings/model/types';
import { deleteLinkedStudent } from '@src/pages/LessonSettings/model';
import { Student } from '@src/types';
import { DefaulRow } from '@components/PersonInfoRow';

type ViewStudentRowProps = {
  data: Student;
  stream: Stream;
};
export const ViewStudentRow = ({ data, stream }: ViewStudentRowProps) => {
  const { fullName, email, group } = data;
  const onClick = () => {
    deleteLinkedStudent.setItem({ student: data, stream });
  };
  return (
    <DefaulRow
      commonInfoProps={{
        className: 'grow',
        fullName,
        email,
        badgeProps: group?.caption ? { iconName: 'master-team', text: group?.caption } : undefined,
      }}
      removeButtonProps={{ onClick }}
    />
  );
};
