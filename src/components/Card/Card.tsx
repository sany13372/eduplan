import React, { FC } from 'react';

type CardProps = {
  className?: string;
};
export const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-[6px] max-w-full ${className}`} data-testid="cardBlock">
      {children}
    </div>
  );
};
