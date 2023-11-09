import { Typography } from '@kit-edu/typography';
import classNames from 'classnames';

type EmailProps = {
  val: string;
  className?: string;
};
export const Email = ({ val, className }: EmailProps) => {
  return (
    <Typography as="span" size="14px" className={classNames('truncate', className)}>
      {val}
    </Typography>
  );
};
