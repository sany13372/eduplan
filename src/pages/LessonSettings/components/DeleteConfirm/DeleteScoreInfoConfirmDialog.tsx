import { deleteScoreInfo } from '@src/pages/LessonSettings/model';
import { DeleteConfirmDialog } from '@src/components';
import { ScoreInfo } from '@src/pages/LessonSettings/model/types';

export const DeleteScoreInfoConfirmDialog = () => {
  return (
    <DeleteConfirmDialog<ScoreInfo>
      nodes={deleteScoreInfo}
      dialogContent={{ description: 'Вы действительно хотите удалить форму контроля?' }}
    />
  );
};
