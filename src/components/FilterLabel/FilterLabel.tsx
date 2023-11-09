import { Typography } from '@kit-edu/typography';
import { PropsWithChildren } from 'react';

type FilterLabelProps = {
  label: string;
  isSubFilter?: boolean;
};
export const FilterLabel = ({
  label,
  isSubFilter = false,
  children,
}: PropsWithChildren<FilterLabelProps>): JSX.Element => {
  const labelClassNames = isSubFilter ? 'mr-1' : 'w-1/3 mr-1';
  const childrenClassNames = isSubFilter ? 'flex-grow' : 'w-2/3';
  const containerClassNames = isSubFilter ? 'gap-4' : '';

  return (
    <div className={`flex flex-row items-center ${containerClassNames}`}>
      <div className={labelClassNames}>
        <Typography as="p" size="14px">
          {label}
        </Typography>
      </div>
      <div className={childrenClassNames}>{children}</div>
    </div>
  );
};
