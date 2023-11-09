import { resetBasePath, setBasePath } from '@src/constants/routes';
import { useEffect } from 'react';

import '@src/styles/index.css';
import '@sber-universe/om-component-library/dist/styles.css';
import '@src/styles/common.css';
import { LessonInfo } from './LessonInfo';

interface Props {
  basePath: string;
}

export const LessonContentExposedPages = ({ basePath }: Props): JSX.Element => {
  setBasePath(basePath);
  useEffect(() => resetBasePath, []);
  return (
    <div className={`${process.env.APP_NAME_VERSION} default`}>
      <LessonInfo />
    </div>
  );
};
