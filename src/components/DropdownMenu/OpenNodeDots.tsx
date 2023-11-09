import { Button, ButtonProps } from '@kit-edu/button';
import React from 'react';

import { ReactComponent as DotsIcon } from './dots.svg';

type OpenNodeDotsProps = Pick<ButtonProps, 'disabled'>;

export const OpenNodeDots: React.FC<OpenNodeDotsProps> = ({ disabled }) => (
  <Button size="medium" appearance="light-outline" className="w-10 h-10" disabled={disabled}>
    <DotsIcon />
  </Button>
);
