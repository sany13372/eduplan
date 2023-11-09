import { sample } from 'effector';
import {
  $uploadSCORMProgress,
  setUploadSCORMProgress,
  uploadScorm,
  uploadScormFx,
} from '@src/pages/LessonContent/model';
import { addErrorToast } from '@src/app/model';
import { uploadScormMutation } from '@src/pages/LessonContent/model/init/queries';

sample({
  clock: uploadScorm,
  target: uploadScormFx,
});

uploadScormFx.use(async (params) => uploadScormMutation(params));

sample({
  clock: uploadScormFx.fail,
  fn: () => addErrorToast({ message: 'Не удалось загрузить файл' }),
});

$uploadSCORMProgress.on(setUploadSCORMProgress, (state, val) => val).reset([uploadScormFx.fail, uploadScormFx.done]);
