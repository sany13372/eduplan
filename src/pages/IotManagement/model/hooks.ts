import { EduGridElementData } from '@src/pages/IotManagement/model/types';
import { useStore } from 'effector-react';
import { $newFilters, eduGridElements } from '@src/pages/IotManagement/model/index';
import { defauleEduGridElementItem, defaultNewFilterVal } from '@src/pages/IotManagement/model/constants';
import isEqual from 'lodash/isEqual';

export const useEduGridElementsFiltered = (): EduGridElementData[] => {
  const items = useStore(eduGridElements.$value);
  const { gridElement } = useStore($newFilters);
  return gridElement.id === defauleEduGridElementItem.id ? items : items.filter((e) => e.id === gridElement.id);
};

export const useHasFilters = () => {
  const filters = useStore($newFilters);
  return !isEqual(filters, defaultNewFilterVal);
};
