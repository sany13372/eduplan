import { Label } from '@sber-universe/om-component-library';
import { Typography } from '@kit-edu/typography';
import { ReactText } from 'react';

type FieldDescProps = {
  content: ReactText;
  label: string;
};

export const FieldDesc = ({ content, label }: FieldDescProps) => {
  return (
    <Label caption={label} captionClassName="self-start">
      <Typography as="p" size="14px" lineHeight="high" className="break-words">
        {content}
      </Typography>
    </Label>
  );
};
