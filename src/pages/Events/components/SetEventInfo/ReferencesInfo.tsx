import { Panel, TextGroup } from '@src/components';
import { ReactComponent as KindIcon } from '@src/assets/icons/events/kindIcon.svg';
import { ReactComponent as FormatIcon } from '@src/assets/icons/events/formatIcon.svg';
import React from 'react';

type ReferencesInfoProps = {
  formatLabel?: string;
  kindLabel?: string;
};
export const ReferencesInfo = ({ formatLabel = '', kindLabel = '' }: ReferencesInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Panel className="px-[30px] py-[18px] space-x-[30px] flex items-center ">
        <KindIcon />
        <TextGroup mainText={kindLabel} secondaryText="Вид" />
      </Panel>
      <Panel className="px-[30px] py-[18px]  space-x-[30px] flex items-center">
        <FormatIcon />
        <TextGroup mainText={formatLabel} secondaryText="Формат" />
      </Panel>
    </div>
  );
};
