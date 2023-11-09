import { Typography } from '@kit-edu/typography';
import React from 'react';

type ErrorMessageProps = {
  message?: string;
};

export const ErrorMessage = ({
  message = 'Что-то пошло не так. Попробуйте ещё раз.',
}: ErrorMessageProps): JSX.Element => {
  return (
    <div className="text-center">
      <Typography as="p" size="20px" className="text-negative">
        {message}
      </Typography>
    </div>
  );
};
