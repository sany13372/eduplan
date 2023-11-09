import { deleteSCORM } from '@src/pages/LessonContent/model';
import { Button } from '@kit-edu/button';

import { DeleteScormConfirmDialog } from './DeleteScormConfirmDialog';

type RemoveScormProps = {
  scormId: string;
  isAllowRegistration: boolean;
};
export const RemoveScorm = ({ scormId, isAllowRegistration }: RemoveScormProps): JSX.Element => {
  const removeClickHandler = () => {
    deleteSCORM.setItem(scormId);
  };
  return (
    <>
      <Button size="medium" appearance="dark-outline" onClick={removeClickHandler} disabled={isAllowRegistration}>
        Удалить
      </Button>
      <DeleteScormConfirmDialog />
    </>
  );
};
