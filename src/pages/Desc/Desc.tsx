/* eslint-disable react-hooks/exhaustive-deps */
import { SwitchWithDefault, LoadingWrapper } from '@sber-universe/om-component-library';
import { Route, useParams } from 'react-router-dom';
import { EduPlanParams, getPath, MfeRoutes } from '@constants/routes';
import { useEffect } from 'react';
import { resetMfeBackGround, setMfeBackGround } from '@src/app/model';
import { eduPlanDesc, resetDomainData } from '@src/pages/Desc/model';
import { useStore } from 'effector-react';
import { ViewDesc } from '@src/pages/Desc/ViewDesc';
import { UpdateDesc } from '@src/pages/Desc/UpdateDesc';
import './model/init';

export const DescManagement = () => {
  const { planId } = useParams<EduPlanParams>();
  const getInfoStatus = useStore(eduPlanDesc.$status);

  useEffect(() => {
    setMfeBackGround('gray');
    return resetMfeBackGround;
  }, []);

  useEffect(() => {
    eduPlanDesc.get(planId);
    return resetDomainData;
  }, []);

  return (
    <SwitchWithDefault>
      <LoadingWrapper loadingStatusList={[getInfoStatus]} errorStatusList={[getInfoStatus]}>
        <Route path={getPath(MfeRoutes.EDU_PLAN_DESC_VIEW)} component={ViewDesc} />
        <Route path={getPath(MfeRoutes.EDU_PLAN_DESC_EDIT)} component={UpdateDesc} />
        <Route exact path={getPath(MfeRoutes.EDU_PLAN_DESC_ROOT)} component={ViewDesc} />
      </LoadingWrapper>
    </SwitchWithDefault>
  );
};
