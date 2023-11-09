import { Tooltip } from '@kit-edu/tooltip';
import { Typography } from '@kit-edu/typography';
import { Icon } from '@kit-edu/icon';
import { GroupDesc } from '@src/pages/Desc/model/types';

export type GroupTitleProps = {
  info: GroupDesc;
};
export const GroupTitle = ({ info }: GroupTitleProps) => {
  const { title, desc } = info;
  return (
    <div className="flex items-center space-x-4" data-testid="groupTitle">
      <Typography as="h3" fontWeight="semibold" size="20px" className="truncate">
        {title}
      </Typography>
      <Tooltip
        maxWidth={340}
        content={
          <Typography as="p" size="12px">
            {desc}
          </Typography>
        }
      >
        <div>
          <Icon iconName="master-question" size="20" className="text-positive" />
        </div>
      </Tooltip>
    </div>
  );
};
