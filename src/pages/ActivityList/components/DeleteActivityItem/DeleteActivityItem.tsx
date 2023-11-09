import { $deleteEduPlanRowError, dismissDeleteEduPlanRowError } from '@src/pages/ActivityList/model';
import React from 'react';
import { useStore } from 'effector-react';

import { DeleteErrorModal } from './DeleteErrorModal';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';

export const DeleteActivityItem = (): JSX.Element => {
  const deleteErrorMessage = useStore($deleteEduPlanRowError);

  return (
    <>
      <DeleteConfirmationModal />
      <DeleteErrorModal errorMessage={deleteErrorMessage} close={dismissDeleteEduPlanRowError} />
    </>
  );
};
