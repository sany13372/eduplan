import { Tabs as TabsDefault } from '@sber-universe/om-component-library';
import React, { ReactText, useMemo } from 'react';
import { Stepper as StepperDefault } from '@kit-edu/stepper';
import { useStore } from 'effector-react';
import { $mfeBackground } from '@src/app/model';

export type TabType = 'info' | 'participantList';
export type TabState = 'completed' | 'incompleted';
type TabInfo = {
  caption: string;
  id: TabType;
  state: TabState;
};

type TabsProps = {
  value: TabType;
  onTabChange: (item: TabType) => void;
};

const initTabs: TabInfo[] = [
  { caption: 'Описание', id: 'info', state: 'incompleted' },
  { caption: 'Участники', id: 'participantList', state: 'incompleted' },
];

export const Tabs = ({ onTabChange, value }: TabsProps) => {
  const backgroundValue = useStore($mfeBackground);

  const onChange = (val: ReactText) => {
    onTabChange(val as TabType);
  };

  return (
    <TabsDefault
      currentItemId={value}
      items={initTabs}
      onChange={onChange}
      size="large"
      colorMode={backgroundValue === 'gray' ? 'dark' : 'default'}
    />
  );
};

type StepperProps = {
  currentTab: TabType;
  infoStatus: TabState;
  participantStatus: TabState;
};
export const Stepper = ({ infoStatus, participantStatus, currentTab }: StepperProps) => {
  const tabs = useMemo(
    () =>
      initTabs.map((e) => {
        if (e.id === 'info') e.state = infoStatus;
        if (e.id === 'participantList') e.state = participantStatus;
        return e;
      }),
    [infoStatus, participantStatus],
  );
  return <StepperDefault currentItemId={currentTab} items={tabs} onChange={() => {}} />;
};
