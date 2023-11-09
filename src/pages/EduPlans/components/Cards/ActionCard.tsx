import React from 'react';

import { MainCard, MainCardProps } from './MainCard';

type ActionCardProps = Pick<MainCardProps, 'iconName' | 'label' | 'dataTestId'> & {
  onClick: () => void;
  containerClassName: string;
};
export const ActionCard: React.FC<ActionCardProps> = ({
  children,
  label,
  iconName,
  onClick,
  containerClassName,
  dataTestId,
}) => {
  return (
    // eslint-disable-next-line react/button-has-type,jsx-a11y/no-redundant-roles
    <button className={containerClassName} onClick={onClick} role="button">
      <MainCard actionIconName="master-edit" dataTestId={dataTestId} iconName={iconName} label={label}>
        {children}
      </MainCard>
    </button>
  );
};
