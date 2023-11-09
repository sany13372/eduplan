import { Hint as HintDefault, HintProps as HintPropsDefault } from '@kit-edu/tooltip/build/presets';
import React from 'react';

import { ReactComponent as QuestionIcon } from './question.svg';

type HintProps = Omit<HintPropsDefault, 'children'>;
export const Hint = (props: HintProps) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <HintDefault {...props}>
      <QuestionIcon />
    </HintDefault>
  );
};
