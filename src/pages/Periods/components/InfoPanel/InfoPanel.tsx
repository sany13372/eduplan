import { Typography } from '@kit-edu/typography';

import { AddPeriodButton } from './AddPeriodButton';

type InfoPanelProps = {
  allowAdd?: boolean;
  title: string;
};
export const InfoPanel = ({ allowAdd, title }: InfoPanelProps) => {
  return (
    <div className="flex space-x-y items-center justify-between" data-testid="infoPanel">
      <Typography size="14px" className="bg-white rounded-full px-3 py-1.5">
        {title}
      </Typography>
      {allowAdd && <AddPeriodButton />}
    </div>
  );
};
