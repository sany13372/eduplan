import React from 'react';

export const StudentsInfoContainer: React.FC = ({ children }) => {
  return (
    <div className="mb-4" data-testid="groupBlock">
      {children}
    </div>
  );
};
