import { Stream } from '@src/pages/LessonSettings/model/types';
import { deleteLinkedTeacher } from '@src/pages/LessonSettings/model';
import { Teacher } from '@src/types';
import { DefaulRow } from '@components/PersonInfoRow';

type ViewTeacherRowProps = {
  data: Teacher;
  stream: Stream;
};
export const ViewTeacherRow = ({ data, stream }: ViewTeacherRowProps) => {
  const { tenant, email, fullName } = data;
  const onClick = () => {
    deleteLinkedTeacher.setItem({ teacher: data, stream });
  };
  return (
    <DefaulRow
      commonInfoProps={{
        className: 'grow',
        fullName,
        email,
        badgeProps: tenant?.caption ? { iconName: 'master-home', text: tenant?.caption } : undefined,
      }}
      removeButtonProps={{ onClick }}
    />
  );
};
