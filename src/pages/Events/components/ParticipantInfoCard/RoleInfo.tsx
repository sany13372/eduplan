import { Badge } from '@src/components';
import React from 'react';

type RoleInfoProps = {
  label: string;
};
export const RoleInfo = ({ label }: RoleInfoProps) => {
  return (
    <div className="w-[112px] flex mr-auto md:mr-0">
      <Badge text={label} />
    </div>
  );
};
