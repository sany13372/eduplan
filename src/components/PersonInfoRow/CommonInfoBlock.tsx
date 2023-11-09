import { FullName as FullNameT } from '@src/types';
import { ColorBadgeProps } from '@sber-universe/om-component-library';
import classnames from 'classnames';

import { FullName } from './FullName';
import { Email } from './Email';
import { Badge } from './Badge';

export type CommonInfoBlockProps = {
  fullName: FullNameT;
  email: string;
  badgeProps?: Pick<ColorBadgeProps, 'text' | 'iconName'>;
  className?: string;
};
export const CommonInfoBlock = ({ className, email, fullName, badgeProps }: CommonInfoBlockProps) => {
  return (
    <div className={classnames('grid grid-cols-10 items-center gap-6', className)}>
      <FullName data={fullName} className="col-span-3" />
      <Email val={email} className="col-span-4" />
      {badgeProps && <Badge className="col-span-3" iconName={badgeProps.iconName} text={badgeProps.text} />}
    </div>
  );
};
