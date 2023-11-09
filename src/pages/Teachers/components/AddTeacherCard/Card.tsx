import React, { FC } from 'react';

export const Card: FC = ({ children }) => {
  return (
    <div
      className="bg-white rounded-[6px] px-6 flex flex-none space-x-6 max-w-full items-center py-2"
      data-testid="selectTeacherWidget"
    >
      {children}
    </div>
  );
};
