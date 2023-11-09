import { Button } from '@kit-edu/button';
import { useSelectedImpls } from '@src/pages/Lessons/model/hooks';
import { useHistory } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';

type AddStudentsButtonProps = {
  themeId: string;
};

export const AddStudentsButton = ({ themeId }: AddStudentsButtonProps): JSX.Element => {
  const history = useHistory();
  const selectedImpls = useSelectedImpls(themeId);

  const itemsNotSelected = selectedImpls.length === 0;
  const clickHandler = () => {
    history.push(
      getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_LESSON_STUDENTS, { ':themeId': themeId, ':implId': selectedImpls[0] }),
    );
  };
  return (
    <Button disabled={itemsNotSelected} onClick={clickHandler} size="medium">
      Записать обучающихся
    </Button>
  );
};
