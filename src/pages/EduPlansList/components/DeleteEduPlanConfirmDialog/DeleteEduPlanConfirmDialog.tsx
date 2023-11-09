import { useEffect } from 'react';
import { useStore } from 'effector-react';
import {
  $deleteEduPlanError,
  $deleteEduPlanState,
  deleteEduPlan,
  dismissDeleteEduPlanError,
  resetDeleteEduPlanState,
} from '@src/pages/EduPlansList/model';
import { ConfirmDialog, ErrorDialog } from '@sber-universe/om-component-library';

export const DeleteEduPlanConfirmDialog = (): JSX.Element => {
  const id = useStore($deleteEduPlanState);
  const isOpen = Boolean(id);
  const deleteErrorMessage = useStore($deleteEduPlanError);

  useEffect(() => resetDeleteEduPlanState, []);

  return (
    <>
      {isOpen && (
        <ConfirmDialog
          onConfirm={deleteEduPlan}
          isOpen
          onCancel={resetDeleteEduPlanState}
          dialogContent={{
            title: 'Удаление плана обучения',
            description: 'Вы действительно хотите удалить план обучения?',
            confirmLabel: 'Удалить',
            cancelLabel: 'Отменить',
          }}
        />
      )}
      <ErrorDialog
        isOpen={Boolean(deleteErrorMessage)}
        dialogContent={{ description: deleteErrorMessage }}
        portalId="deletePlanPortal"
        onClose={dismissDeleteEduPlanError}
      />
    </>
  );
};
