import { Link } from 'react-router-dom';
import { Typography } from '@kit-edu/typography';

import { MainCard, MainCardProps } from './MainCard';

type LinkCardProps = Pick<MainCardProps, 'iconName' | 'label' | 'dataTestId'> & {
  to: string;
  title: string;
  containerClassName: string;
};
export const LinkCard = ({ label, iconName, to, containerClassName, title, dataTestId }: LinkCardProps) => {
  return (
    <Link target="_blank" to={to} className={containerClassName}>
      <MainCard actionIconName="master-arrow-right" dataTestId={dataTestId} iconName={iconName} label={label}>
        <Typography as="h4" fontWeight="semibold" size="16px">
          {title}
        </Typography>
      </MainCard>
    </Link>
  );
};
