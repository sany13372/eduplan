import { Typography } from '@kit-edu/typography';
import { Icon } from '@kit-edu/icon';
import { Tooltip } from '@kit-edu/tooltip';

type InfoMessageProps = {
  message: string;
  description: string;
};
export const InfoMessage = ({ message, description }: InfoMessageProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Tooltip
        disabled={!description}
        content={
          <Typography as="p" className="w-40" size="12px">
            {description}
          </Typography>
        }
      >
        <div>
          <Icon iconName="master-warning" size="20" className="text-[#4ade80]" />
        </div>
      </Tooltip>
      <Typography as="p" color="medium" size="14px" lineHeight="high">
        {message}
      </Typography>
    </div>
  );
};
