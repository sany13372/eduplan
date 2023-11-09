/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ReactComponent as LoaderIcon } from '@src/assets/icons/common/loading.svg';

type UploadOnScrollProps = {
  isLoading: boolean;
  isDisabled: boolean;
  handler: () => void;
  initialInView?: boolean;
};
export const UploadOnScroll = ({ handler, isLoading, isDisabled, initialInView = false }: UploadOnScrollProps) => {
  const { ref, inView } = useInView({
    initialInView,
  });
  useEffect(() => {
    if (!isLoading && inView && !isDisabled) {
      handler();
    }
  }, [inView]);

  return (
    <>
      <div ref={ref} />
      {isLoading && (
        <div className="flex item-center">
          <LoaderIcon width={100} height={100} />
        </div>
      )}
    </>
  );
};
