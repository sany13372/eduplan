import React, { FC } from 'react';

type CardProps = {
  isLow?: boolean;
};
export const Card: FC<CardProps> = ({ children, isLow }) => {
  return (
    <div
      className={`bg-white rounded-[6px] px-6 flex flex-none flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-6 max-w-full md:items-center justify-between ${
        isLow ? 'py-2' : 'py-3 '
      }`}
    >
      {children}
    </div>
  );
};
