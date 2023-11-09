import { DropdownMenu } from '@src/components';
import { useMemo } from 'react';
import { getPath, MfeRoutes } from '@constants/routes';
import { useHistory } from 'react-router-dom';
import { setItemId } from '@src/pages/ActivityList/model';

import { EduGridInfo, MenuItem, Action } from './types';
import { items } from './constants';

type EduGridElementActionsProps = {
  info: EduGridInfo;
  itemName: string;
};

export const EduGridElementActions = ({
  info: { gridElementId, eduPlanId, eduProgId },
  itemName,
}: EduGridElementActionsProps) => {
  const history = useHistory();

  const getPathParams = useMemo(
    () => ({ ':id': eduProgId, ':planId': eduPlanId, ':gridElementId': gridElementId }),
    [eduProgId, eduPlanId, gridElementId],
  );
  const createActivityPath = useMemo(
    () => getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_CREATE, getPathParams),
    [getPathParams],
  );

  const createActivityGroupPath = useMemo(
    () => getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_GROUP_CREATE, getPathParams),
    [getPathParams],
  );
  const handleChecked = (item: MenuItem) => {
    switch (item.id) {
      case 'CREATE_ACTIVITY':
        history.push(createActivityPath);
        break;
      case 'CREATE_ACTIVITY_GROUP':
        history.push(createActivityGroupPath);
        break;
      case 'PERIODS_MANAGEMENT':
        setItemId({ id: gridElementId, title: itemName });
        break;
      default:
        console.warn('Действие не найдено');
    }
  };

  return <DropdownMenu<MenuItem, typeof Action> items={items} handleChecked={handleChecked} actions={Action} />;
};
