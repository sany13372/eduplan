import { TeacherInfo } from '@src/pages/Teachers/model/types';
import { Avatar } from '@src/pages/Teachers/components';
import { FullNameData } from '@src/pages/Teachers/components/AddTeacherCard/FullNameData';
import { EmailData } from '@src/pages/Teachers/components/AddTeacherCard/EmailData';
import { Badge } from '@src/components';
import { Icon } from '@kit-edu/icon';

import { AddTeacherCheckbox } from './AddTeacherCheckBox';
import { Card } from './Card';

type AddTeacherCardProps = {
  data: TeacherInfo;
};

export const AddTeacherCard = ({ data }: AddTeacherCardProps) => {
  return (
    <Card>
      <AddTeacherCheckbox item={data} />
      <div className="flex-none">
        <Avatar firstName={data.firstName} lastName={data.lastName} size="small" />
      </div>
      <div className="grid grid-cols-12 gap-6 flex-grow">
        <FullNameData
          firstName={data.firstName}
          lastName={data.lastName}
          middleName={data.middleName}
          className="truncate col-span-4  my-auto"
        />
        <EmailData email={data.email} className="truncate  col-span-5 my-auto" />
        <div className="col-span-3 flex">
          {data.tenant.shortTitle && (
            <Badge
              text={data.tenant.shortTitle}
              icon={<Icon className="text-[#4ade80] flex-none" iconName="master-home" size="12" />}
            />
          )}
        </div>
      </div>
    </Card>
  );
};
