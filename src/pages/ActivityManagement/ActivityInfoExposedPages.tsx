import { resetBasePath, setBasePath } from '@src/constants/routes';
import { useEffect } from 'react';
import '@src/styles/index.css';
import '@sber-universe/om-component-library/dist/styles.css';
import '@src/styles/common.css';

import { ActivityInfoDefault, ActivityInfoDefaultProps } from './ActivityInfoDefault';

interface Props {
  basePath: string;
}

export const ActivityInfoExposedPages = ({ basePath, ...props }: Props & ActivityInfoDefaultProps): JSX.Element => {
  setBasePath(basePath);
  useEffect(() => resetBasePath(), []);
  return (
    <div className={`${process.env.APP_NAME_VERSION} default`}>
      {/*  eslint-disable-next-line react/jsx-props-no-spreading */}
      <ActivityInfoDefault {...props} />
    </div>
  );
};
