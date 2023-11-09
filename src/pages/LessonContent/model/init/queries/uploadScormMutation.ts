import { UploadScormParams } from '@src/pages/LessonContent/model/types';
import { AxiosResponse } from 'axios';
import { uploadApiInstance } from '@utils/axios';
import { UploadApiRoutes } from '@constants/uploadRoutes';
import { setUploadSCORMProgress } from '@src/pages/LessonContent/model';

const getFormData = ({ scormPackageFile, lessonId }: UploadScormParams): FormData => {
  const formData = new FormData();

  formData.append('mimetype', scormPackageFile.type);
  formData.append('file', scormPackageFile);
  formData.append('filename', scormPackageFile.name);
  formData.append('lessonId', lessonId);
  return formData;
};

export const uploadScormMutation = async (params: UploadScormParams): Promise<boolean> => {
  const data = getFormData(params);
  try {
    const resp: AxiosResponse<{ scormPackageId: string }> = await uploadApiInstance.post(
      UploadApiRoutes.UPLOAD_SCORM,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          const totalSize: number = e.total;
          const loadedSize: number = e.loaded;
          if (totalSize && loadedSize && e.lengthComputable && e.type === 'progress') {
            const uploadedPart = ((loadedSize / totalSize) * 100).toFixed(2);
            setUploadSCORMProgress(Number.parseFloat(uploadedPart));
          }
        },
      },
    );
    return [200, 201].includes(resp.status);
  } catch (e) {
    throw new Error('Не удалось загрузить файл');
  }
};
