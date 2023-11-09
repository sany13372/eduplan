import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { ConfirmDialog, ErrorDialog } from '@sber-universe/om-component-library';
import { EduPlanParams, getPath, MfeRoutes } from '@constants/routes';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { deletePeriod } from '@src/pages/Periods/model';
import { addSuccessToast } from '@src/app/model';

export const DeletePeriodConfirmDialog = (): JSX.Element => {
  const item = useStore(deletePeriod.$item);
  const isDeleted = useStore(deletePeriod.$isDeleted);
  const history = useHistory();
  const { planId } = useParams<EduPlanParams>();
  const isGroupPage = useRouteMatch(getPath(MfeRoutes.EDU_PLAN_INFO_GROUP_VIEW));
  const isOpen = Boolean(item?.id);
  const deleteErrorMessage = useStore(deletePeriod.$validationError);
  useEffect(() => deletePeriod.reset, []);
  const onConfirm = () => {
    if (item) deletePeriod.delete(item);
    if (isGroupPage)
      history.push(
        getPath(MfeRoutes.EDU_PLAN_INFO_STUDENT_GROUP_LIST, {
          ':planId': planId,
        }),
      );
  };

  useEffect(() => {
    if (isDeleted) {
      addSuccessToast({});
      deletePeriod.reset();
    }
  }, [isDeleted]);
  return (
    <>
      <ConfirmDialog
        portalId="remove_group_portal"
        onConfirm={onConfirm}
        isOpen={isOpen}
        onCancel={deletePeriod.reset}
        dialogContent={{
          description: 'Вы действительно хотите удалить период?',
          confirmLabel: 'Удалить',
          cancelLabel: 'Отмена',
        }}
      />
      <ErrorDialog
        portalId="remove_group_error_portal"
        isOpen={Boolean(deleteErrorMessage)}
        dialogContent={{
          description: deleteErrorMessage,
        }}
        onClose={deletePeriod.dismissValidationError}
      />
    </>
  );
};
