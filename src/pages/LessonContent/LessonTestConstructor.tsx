import { FC } from 'react';
import { TestConstructor } from '@sbo/test-constructor';
import '@sbo/test-constructor/dist/index.css';
import { useStore } from 'effector-react';
import { lessonInfoStore } from '@src/pages/LessonContent/model';

export const LessonTestConstructor: FC = () => {
  const lesson = useStore(lessonInfoStore.$value);
  const getHeaders = () => {
    const token: string = window.localStorage.getItem('token') ?? '';
    return { Authorization: `Bearer ${token}` };
  };
  return (
    <div className="flex flex-col h-full">
      <TestConstructor
        className="h-full"
        apiConfig={{
          urls: {
            TEST_CONSTRUCTOR_SERVICE_URL: process.env.MFE_TEST_CONSTRUCTOR_SERVICE_URL,
            CONTENT_SERVICE_URL: process.env.MFE_CONTENT_CONSTRUCTOR_SERVICE_URL,
            FILE_PIPELINE_SERVICE_URL: process.env.MFE_FILE_PIPELINE_SERVICE,
          },
          getHeaders,
        }}
        id={lesson.lessonId}
      />
    </div>
  );
};
