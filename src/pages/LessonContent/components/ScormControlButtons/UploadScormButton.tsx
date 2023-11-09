import { UploadFileButton } from '@sber-universe/om-component-library';
import { $uploadSCORMProgress, $uploadScormStatus, uploadScorm } from '@src/pages/LessonContent/model';
import { useStore } from 'effector-react';
import { Lesson } from '@src/pages/LessonContent/model/types';
import { UploadProgress } from '@src/pages/LessonContent/components/ScormControlButtons/UploadProgress';

type UploadScormButtonProps = {
  lesson: Lesson;
};
export const UploadScormButton = ({ lesson }: UploadScormButtonProps): JSX.Element => {
  const { lessonId } = lesson;
  const uploadStatus = useStore($uploadScormStatus);
  const uploadProgress = useStore($uploadSCORMProgress);
  return (
    <>
      {!uploadProgress ? (
        <UploadFileButton
          label="Загрузить"
          buttonProps={{
            size: 'medium',
            disabled: uploadStatus === 'pending',
            iconLeftName: 'master-upload',
          }}
          uploaderProps={{
            multiple: false,
            accept: '.zip',
            onDropAccepted: (files: File[]) => {
              if (files.length > 0) uploadScorm({ scormPackageFile: files[0], lessonId });
            },
          }}
        />
      ) : (
        <UploadProgress progress={uploadProgress} />
      )}
    </>
  );
};
