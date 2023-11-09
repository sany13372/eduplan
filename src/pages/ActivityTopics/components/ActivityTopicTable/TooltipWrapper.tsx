import { Tooltip } from '@kit-edu/tooltip';
import { Typography } from '@kit-edu/typography';
import React, { useRef } from 'react';

type TooltipWrapperProps = {
  appendToId?: string;
  desc: string;
  delay?: number;
};
export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  appendToId = 'tooltip-container',
  desc,
  children,
  delay = 300,
}): JSX.Element => {
  const ref = useRef<HTMLParagraphElement | null>(null);

  return (
    <>
      <Tooltip
        appendToId={appendToId}
        trigger="mouseenter click"
        reference={ref.current}
        content={
          <Typography as="p" size="12px" color="white" className="whitespace-pre-wrap">
            {desc}
          </Typography>
        }
        delay={delay}
      >
        {null}
      </Tooltip>
      <Typography ref={ref} as="p" size="12px" className="truncate">
        {children}
      </Typography>
    </>
  );
};
