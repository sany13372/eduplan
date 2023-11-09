import React from 'react';

import { CommonInfoBlock } from './CommonInfoBlock';
import { RemoveButton } from './RemoveButton';
import { CheckBox } from './CheckBox';

type PersonInfoRowProps = {
  children: React.ReactNode;
};
export const PersonInfoRow = ({ children }: PersonInfoRowProps) => {
  return <div className="bg-white rounded-md flex flex-row items-center gap-6 py-3 px-6 min-h-[56px]">{children}</div>;
};

PersonInfoRow.CommonInfoBlock = CommonInfoBlock;
PersonInfoRow.RemoveButton = RemoveButton;
PersonInfoRow.CheckBox = CheckBox;
