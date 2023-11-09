import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from '@kit-edu/button';

type ScrollArrowProps = {
  isDisabled?: boolean;
  className?: string;
};
export const ScrollArrow: React.FC<ScrollArrowProps> = ({ className = '', children, isDisabled = false }) => {
  const { ref, inView, entry } = useInView({ initialInView: true });
  const scrollTop = () => {
    entry?.target.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  };
  return (
    <div className="relative">
      <div ref={ref} />
      {children}
      {!inView && !isDisabled && (
        <div className="sticky h-0 bottom-0 left-0">
          <Button
            onClick={scrollTop}
            size="medium"
            appearance="dark-outline"
            className={`absolute  bg-white w-10 h-10 ${className}`}
            shape="circular"
            iconLeftName="master-arrow-up"
          />
        </div>
      )}
    </div>
  );
};
