import './model/init';
import { ActionsButtonGroup, DeleteEduPlanConfirmDialog } from '@src/pages/EduPlansList/components';
import { useEffect, useMemo } from 'react';
import { resetDeleteEduPlanState, $deleteEduPlanStatus } from '@src/pages/EduPlansList/model';
import { ExternalRoutes, getExtenalPath, getPath, MfeRoutes } from '@constants/routes';
import { $prevIsExternal } from '@src/app/model';
import { useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';

export type EduPlansActionsWidgetProps = {
  id: string;
  programId?: string;
  variant?: 'dark' | 'light';
};
export const EduPlansActionsWidget = ({
  id,
  programId,
  variant = 'light',
}: EduPlansActionsWidgetProps): JSX.Element => {
  const history = useHistory();
  const deleteItemStatus = useStore($deleteEduPlanStatus);
  const idDeleted = deleteItemStatus === 'done';
  const goToEduProgramms = useStore($prevIsExternal);

  const prevPath: string = useMemo(
    () =>
      goToEduProgramms && programId
        ? getExtenalPath(ExternalRoutes.EDU_PLAN, { ':id': programId })
        : getPath(MfeRoutes.EDU_PLAN_LIST),
    [goToEduProgramms, programId],
  );

  useEffect(() => {
    if (idDeleted) history.push(prevPath);
  }, [history, idDeleted, prevPath]);

  useEffect(() => resetDeleteEduPlanState, []);
  return (
    <>
      <DeleteEduPlanConfirmDialog />
      <ActionsButtonGroup id={id} variant={variant} />
    </>
  );
};
