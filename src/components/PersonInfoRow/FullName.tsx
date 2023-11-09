import { Typography } from '@kit-edu/typography';
import { FullName as FullNameT } from '@src/types';
import classNames from 'classnames';

type FullNameProps = {
  data: FullNameT;
  className?: string;
};
export const FullName = ({ className = '', data: { lastName, middleName, firstName } }: FullNameProps) => {
  return (
    <Typography as="span" size="14px" fontWeight="semibold" className={classNames('truncate', className)}>
      {`${lastName} ${firstName} ${middleName}`}
    </Typography>
  );
};
