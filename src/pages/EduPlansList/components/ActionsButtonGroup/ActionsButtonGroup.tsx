import React, { FC, memo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { setDeleteEduPlanState } from '@src/pages/EduPlansList/model';
import { getPath, MfeRoutes } from '@constants/routes';
import { DefaultParams } from '@src/types/types';
import { DarkButtonGroup, LightButtonGroup } from '@src/pages/EduPlansList/components/ActionsButtonGroup/ButtonGroup';
import { useAbility } from '@utils/hooks';

export interface ActionsButtonGroupProps {
  id: string;
  variant?: 'dark' | 'light';
}

export const ActionsButtonGroup: FC<ActionsButtonGroupProps> = memo(({ id, variant = 'light' }) => {
  const { id: eduProgId } = useParams<DefaultParams>();
  const history = useHistory();
  const isCanBeDeleted = useAbility().can('delete', 'EduPlan');

  const editClickHandler = () => {
    history.push(getPath(MfeRoutes.EDU_PLAN_INFO_EDIT, { ':id': eduProgId, ':planId': id }));
  };

  const deleteClickHandler = () => {
    setDeleteEduPlanState(id);
  };
  const ButtonGroup = variant === 'light' ? LightButtonGroup : DarkButtonGroup;
  return (
    <div className="flex space-x-4">
      <ButtonGroup
        editClickHandler={editClickHandler}
        deleteClickHandler={isCanBeDeleted ? deleteClickHandler : undefined}
      />
    </div>
  );
});
