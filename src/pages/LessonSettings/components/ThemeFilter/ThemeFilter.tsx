import React from 'react';
import { useStore } from 'effector-react';
import { $filterItemListStore, $selectedFilterItemStore, setFilterItem } from '@src/pages/LessonSettings/model';
import { Reference } from '@src/types';
import { Selectbox, ItemProps } from '@kit-edu/selectbox';

import styles from './ThemeFilter.module.css';

export const ThemeFilter = () => {
  const val = useStore($selectedFilterItemStore);
  const items = useStore($filterItemListStore);
  const changeHandler = (item: ItemProps) => {
    setFilterItem(item as Reference);
  };
  return (
    <div className={styles.filterContainer}>
      <Selectbox selected={val} items={items} setSelected={changeHandler} matchWidth fullWidth />
    </div>
  );
};
