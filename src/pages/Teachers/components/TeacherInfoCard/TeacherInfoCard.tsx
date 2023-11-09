import { Badge } from '@src/components';
import { TeacherInfo } from '@src/pages/Teachers/model/types';
import { Avatar } from '@src/pages/Teachers/components';
import { Icon } from '@kit-edu/icon';
import { Typography } from '@kit-edu/typography';
import { deleteTeacher } from '@src/pages/Teachers/model';

type TeacherInfoCardProps = {
  data: TeacherInfo;
  path: string;
};

export const TeacherInfoCard = ({ data, path }: TeacherInfoCardProps) => {
  const deleteClickHandler = () => deleteTeacher.setItem(path);
  return (
    <div className="flex flex-col space-y-4 bg-white  rounded-[6px] p-6 " data-testid="teacherInfoCard">
      <div className="flex flex-col space-y-[12px] flex-grow">
        <div className="flex justify-between space-x-4 items-start">
          <Avatar firstName={data.firstName} lastName={data.lastName} size="large" />
          <button
            aria-label="Открепить преподавателя"
            type="button"
            onClick={deleteClickHandler}
            className="hover:text-[#F43F5F] transition"
          >
            <Icon iconName="master-master-delete" size="16" />
          </button>
        </div>
        <div className="flex-grow">
          <Typography fontWeight="semibold" as="p" size="14px" className="truncate">{`${data.lastName}`}</Typography>
          <Typography fontWeight="semibold" as="p" size="14px" className="truncate">{`${data.firstName}`}</Typography>
          <Typography fontWeight="semibold" as="p" size="14px" className="truncate">{` ${data.middleName}`}</Typography>
        </div>
        <Typography as="p" size="12px" color="medium" className="truncate">
          {data.email}
        </Typography>
      </div>
      <div className="flex">
        <Badge text={data.tenant.shortTitle} />
      </div>
    </div>
  );
};
