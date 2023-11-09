import { FC } from 'react';
import { ContentConstructorService } from '@sbo/content-constructor';
import '@sbo/content-constructor/dist/index.css';
import { useStore } from 'effector-react';
import { lessonKindInfoStore, updateContentConstructor } from '@src/pages/LessonContent/model';
import { ContentConstructorUrls } from '@src/pages/LessonContent/model/constants';

export const LessonContentConstructor: FC = () => {
  const lessonKindInfo = useStore(lessonKindInfoStore.$value);
  const apiConfig = {
    getHeaders: () => {
      const token: string = window.localStorage.getItem('token') ?? '';
      return { Authorization: `Bearer ${token}` };
    },
    urls: ContentConstructorUrls,
  };
  const handleSave = () => {
    updateContentConstructor(lessonKindInfo.lessonId);
  };
  return (
    <div className="flex flex-col space-y-8">
      <ContentConstructorService
        apiConfig={apiConfig}
        contentId={lessonKindInfo.lessonId}
        widgetsConfiguration={lessonKindInfo.configuration}
        onSave={handleSave}
        featureSettings={{
          POINTS_FOR_INTERACTIVE_TASKS: true,
        }}
      />
    </div>
  );
};
