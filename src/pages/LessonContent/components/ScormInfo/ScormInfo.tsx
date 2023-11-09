import { Content } from '@src/pages/LessonContent/model/types';
import { Label } from '@sber-universe/om-component-library';
import { dateToLocalDateStringPrettyNew } from '@utils/date';
import { useEffect, useState } from 'react';
import { deleteCookie, setCookie } from '@utils/cookie';
import { ScormInfoPreview } from '@src/pages/LessonContent/components/ScormInfo/ScormInfoPreview';

type ScormInfoProps = {
  scorm: Content;
};
export const ScormInfo = ({ scorm }: ScormInfoProps): JSX.Element => {
  const [cookieAvailable, setCookieAvailable] = useState(false);
  const { fileName, uploadedAt, entryPoint, userFullname } = scorm;
  useEffect(() => {
    setCookie('token', `${window.localStorage.getItem('token') ?? ''}`, { path: '/' });
    setCookieAvailable(true);
    return () => deleteCookie('token');
  }, []);
  return (
    <div className="space-y-6" data-testid="scormData">
      <Label caption="Пакет:">{fileName}</Label>
      <Label caption="Пользователь:">{userFullname} </Label>
      <Label caption="Загружен:">{uploadedAt ? dateToLocalDateStringPrettyNew(uploadedAt) : ''}</Label>
      <div id="scorm-preview-container" />
      {cookieAvailable && entryPoint && <ScormInfoPreview scorm={scorm} />}
    </div>
  );
};
