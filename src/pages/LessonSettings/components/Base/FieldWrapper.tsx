import React from 'react';
import { Typography } from '@kit-edu/typography';
import { getIn, useFormikContext } from 'formik';
import classNames from 'classnames';

type FieldWrapperProps = {
  name: string;
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
};
export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  className = '',
  children,
  rightLabel,
  leftLabel,
  name,
}) => {
  const { errors } = useFormikContext();
  const errorMessage = getIn(errors, name);
  const showFieldError = Boolean(errorMessage);
  return (
    <div
      className={classNames({
        'flex flex-col gap-2 ': true,
        [className]: className,
      })}
    >
      <div className="flex items-center gap-4">
        {leftLabel && (
          <Typography
            size="12px"
            color="medium"
            className={classNames({ 'shrink-0': true, 'text-negative-300': showFieldError })}
          >
            {leftLabel}
          </Typography>
        )}
        {children}
        {rightLabel && (
          <Typography
            size="12px"
            color="medium"
            className={classNames({ 'shrink-0': true, 'text-negative-300': showFieldError })}
          >
            {rightLabel}
          </Typography>
        )}
      </div>
      {showFieldError && (
        <Typography size="12px" className="text-negative-300">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};
