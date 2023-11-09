import { useEffect } from 'react';
import { resetMfeBackGround, setMfeBackGround, setNavigationInfoVisibility } from '@src/app/model';

import { EduPlansListDefault } from './EduPlanListDefault';

export const EduPlansList = (): JSX.Element => {
  useEffect(() => {
    setNavigationInfoVisibility(false);
    return () => {
      setNavigationInfoVisibility(true);
    };
  }, []);

  useEffect(() => {
    setMfeBackGround('gray');
    return resetMfeBackGround;
  }, []);

  return <EduPlansListDefault />;
};
