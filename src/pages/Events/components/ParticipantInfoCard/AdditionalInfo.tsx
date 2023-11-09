import React from 'react';
import { Badge } from '@src/components';
import { useMediaQuery } from '@sber-universe/om-component-library';

export const AdditionalInfoContainer: React.FC = ({ children }) => {
  const isMobile = useMediaQuery({ type: 'down', breakpoint: 'md' });
  return (
    <div
      className="flex items-center space-x-2 md:space-x-participant flex-shrink-0 flex-grow-0 "
      style={{ width: isMobile ? '100%' : 376 }}
      data-testid="participantInfo"
    >
      {children}
    </div>
  );
};

type AdditionalInfoProps = {
  group?: string;
  course?: string;
};
export const AdditionalInfo = ({ course, group }: AdditionalInfoProps) => {
  return (
    <>
      <div className="w-[56px] flex-grow-0 flex-shrink-0 truncate">{course && <Badge text={course} />}</div>
      <div className="flex-grow-0 flex-shrink-0 truncate">{group && <Badge text={group} />}</div>
    </>
  );
};
