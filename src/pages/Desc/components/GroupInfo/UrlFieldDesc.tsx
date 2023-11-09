import { Label } from '@sber-universe/om-component-library';
import React from 'react';
import { CopyToClipboard } from '@src/components';

type UrlFieldDescProps = {
  label: string;
  url: string;
};

export const UrlFieldDesc = ({ url, label }: UrlFieldDescProps) => {
  return (
    <Label caption={label}>
      <CopyToClipboard text={url} withIcon={false} />
    </Label>
  );
};
