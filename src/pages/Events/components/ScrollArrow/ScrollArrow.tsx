import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from '@kit-edu/button';
import './styles.css';

type ScrollArrowProps = {
  isDisabled: boolean;
  className?: string;
  withoutOffset?: boolean;
};
export const ScrollArrow: React.FC<ScrollArrowProps> = ({
  withoutOffset,
  className = 'bottom-2.5',
  children,
  isDisabled,
}) => {
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
            className={`absolute right-0  w-10 h-10 ${className} ${withoutOffset ? '' : ' -mr-[48px]'}`}
            shape="circular"
            iconLeftName="master-arrow-up"
          />
        </div>
      )}
    </div>
  );
};
