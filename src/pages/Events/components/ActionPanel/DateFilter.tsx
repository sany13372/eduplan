import { Tabs } from '@sber-universe/om-component-library';
import { PeriodInfo } from '@src/pages/Events/model/types';
import { ReactText, useMemo } from 'react';
import { setDateFilter } from '@src/pages/Events/model';

type DateFilterProps = { tabs: PeriodInfo[] };
export const DateFilter = ({ tabs }: DateFilterProps) => {
  const selectedItem = useMemo(() => tabs.find((e) => e.isSelected), [tabs]);
  const items = useMemo(
    () =>
      tabs.map((e) => ({
        id: e.id,
        caption: e.label,
        count: e.count,
      })),
    [tabs],
  );
  const changeHandler = (id: ReactText) => {
    const item = tabs.find((e) => e.id === id);
    setDateFilter(item as PeriodInfo);
  };
  return (
    <Tabs
      currentItemId={selectedItem?.id ?? null}
      size="large"
      items={items}
      onChange={changeHandler}
      colorMode="dark"
    />
  );
};
