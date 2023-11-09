import { Typography } from '@kit-edu/typography';

type FullNameDataProps = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  className?: string;
};
export const FullNameData = ({ middleName = '', lastName = '', firstName = '', className = '' }: FullNameDataProps) => {
  return (
    <Typography
      as="p"
      size="14px"
      fontWeight="semibold"
      className={className}
    >{`${lastName} ${firstName} ${middleName}`}</Typography>
  );
};
