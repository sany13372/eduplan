import './model/init';
import React, { useEffect } from 'react';
import { activityList, eduGridElements, groupList, resetDomain, setBaseInfo } from '@src/pages/IotManagement/model';
import { Typography } from '@kit-edu/typography';
import { useParams } from 'react-router-dom';
import { EduPlanParams } from '@constants/routes';
import { useStore } from 'effector-react';
import { DeleteIotConfirmDialog, EduGridElementInfo, NewFilters } from '@src/pages/IotManagement/components';
import { LoadingWrapper } from '@sber-universe/om-component-library';
import { useMfeBackGround } from '@utils/hooks';
import { useEduGridElementsFiltered } from '@src/pages/IotManagement/model/hooks';

export const IotList = (): JSX.Element => {
  const { planId } = useParams<EduPlanParams>();

  const status = useStore(eduGridElements.$status);
  // const trajectoryListStatus = useStore(studentTrajectoryList.$status);
  const activityListStatus = useStore(activityList.$status);
  // const trajectoryMapStatus = useStore(studentTrajectoryMapInitial.$status);
  const filteredEduGridElement = useEduGridElementsFiltered();
  const statusList = [status, activityListStatus];

  useEffect(() => {
    resetDomain();
    setBaseInfo(planId);
    eduGridElements.get(planId);
    // studentTrajectoryList.get(planId);
    groupList.get(planId);
    activityList.get(planId);
  }, [planId]);

  useMfeBackGround('gray');
  return (
    <>
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between">
          <Typography as="h2" size="32px" fontWeight="semibold">
            Индивидуальные образовательные траектории обучающихся
          </Typography>
        </div>
        <LoadingWrapper loadingStatusList={statusList} errorStatusList={statusList}>
          <div className="space-y-8">
            <NewFilters />
            {filteredEduGridElement.map((e) => (
              <EduGridElementInfo eduGridElement={e} key={e.id} />
            ))}
          </div>
        </LoadingWrapper>
      </div>
      <DeleteIotConfirmDialog />
    </>
  );
};
