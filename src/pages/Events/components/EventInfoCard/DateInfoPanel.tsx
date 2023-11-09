import React from 'react';
import { DateRangeInfo, Panel } from '@src/components';

export type DateInfoPanelProps = { startDate?: string; endDate?: string };

export const DateInfoPanel = ({ startDate = '', endDate = '' }: DateInfoPanelProps) => {
  return (
    <Panel className="py-4 px-[18px] flex space-x-[30px] h-full items-center">
      <DateRangeInfo startDate={startDate} endDate={endDate} />
    </Panel>
  );
};
