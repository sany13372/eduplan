import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { ConfirmDialog, ErrorDialog } from '@sber-universe/om-component-library';
import { deleteGroup } from '@src/pages/GroupList/model';
import { EduPlanParams, getPath, MfeRoutes } from '@constants/routes';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

export const DeleteEduGroupConfirmDialog = (): JSX.Element => {
  const item = useStore(deleteGroup.$item);
  const isDeleted = useStore(deleteGroup.$isDeleted);
  const history = useHistory();
  const { planId } = useParams<EduPlanParams>();
  const isGroupPage = useRouteMatch(getPath(MfeRoutes.EDU_PLAN_INFO_GROUP_VIEW));
  const isOpen = Boolean(item?.id);
  const deleteErrorMessage = useStore(deleteGroup.$validationError);
  useEffect(() => deleteGroup.reset, []);
  const onConfirm = () => {
    if (item) deleteGroup.delete(item);
    if (isGroupPage)
      history.push(
        getPath(MfeRoutes.EDU_PLAN_INFO_STUDENT_GROUP_LIST, {
          ':planId': planId,
        }),
      );
  };

  useEffect(() => {
    if (isDeleted) deleteGroup.reset();
  }, [isDeleted]);
  return (
    <>
      <ConfirmDialog
        portalId="remove_group_portal"
        onConfirm={onConfirm}
        isOpen={isOpen}
        onCancel={deleteGroup.reset}
        dialogContent={{
          title: 'Удаление учебной группы',
          description: 'Вы действительно хотите удалить учебную группу?',
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
        onClose={deleteGroup.dismissValidationError}
      />
    </>
  );
};
