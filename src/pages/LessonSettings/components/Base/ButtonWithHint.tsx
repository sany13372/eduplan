/* eslint-disable react/jsx-props-no-spreading */
import { Hint, HintProps } from '@kit-edu/tooltip/build/presets';
import { Button, ButtonProps } from '@kit-edu/button';
import React from 'react';

type ButtonWithHintProps = ButtonProps & { hintProps: Pick<HintProps, 'maxWidth' | 'text' | 'placement'> };
export const ButtonWithHint = ({ children, hintProps, disabled, ...props }: ButtonWithHintProps) => {
  return (
    <Hint {...hintProps} disabled={!disabled}>
      <Button {...props} disabled={disabled}>
        {children}
      </Button>
    </Hint>
  );
};
