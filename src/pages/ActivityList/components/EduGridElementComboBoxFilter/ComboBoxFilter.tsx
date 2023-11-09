import React, { useMemo } from 'react';
import { defaultEduGridElement } from '@src/pages/ActivityList/model/constants';
import { useStore } from 'effector-react';
import { $eduGridElementList } from '@src/pages/ActivityList/model';
import { EduGridElement } from '@src/pages/ActivityList/model/types';
import { ItemProps, Selectbox } from '@kit-edu/selectbox';

import styles from './EduGridElementComBoxFilter.module.css';

type ComboBoxFilterProps = {
  selectedOptions: EduGridElement[];
  onChangeCallback: (data: EduGridElement[]) => void;
};
export const ComboBoxFilter = ({ selectedOptions, onChangeCallback }: ComboBoxFilterProps): JSX.Element => {
  const eduGridElementListDefault = useStore($eduGridElementList);

  const options = useMemo(() => {
    return [defaultEduGridElement, ...eduGridElementListDefault];
  }, [eduGridElementListDefault]);

  const onSelect = (el: ItemProps) => {
    onChangeCallback([el]);
  };

  return (
    <div className={styles.comboboxFilter}>
      <Selectbox selected={selectedOptions[0]} items={options} fullWidth matchWidth setSelected={onSelect} />
    </div>
  );
};
