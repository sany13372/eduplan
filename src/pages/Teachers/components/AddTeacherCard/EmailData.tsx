import { Typography } from '@kit-edu/typography';

type EmailDataProps = {
  email?: string;
  className?: string;
};
export const EmailData = ({ email = '', className = '' }: EmailDataProps) => {
  return (
    <Typography as="p" size="14px" color="medium" className={className}>
      {email}
    </Typography>
  );
};
