import { Button, ButtonProps } from '@kit-edu/button';
import React from 'react';

type OpenNodeButtonProps = Pick<ButtonProps, 'iconRightName' | 'appearance' | 'disabled'>;
export const OpenNodeButton = ({ iconRightName, appearance, disabled }: OpenNodeButtonProps) => (
  <Button size="medium" iconRightName={iconRightName} appearance={appearance} disabled={disabled}>
    Действия
  </Button>
);
