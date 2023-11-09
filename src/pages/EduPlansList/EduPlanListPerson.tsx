import React, { useEffect } from 'react';
import { Typography } from '@kit-edu/typography';
import { PersonEduPlanList } from '@src/pages/EduPlansList/components';
import { LoadingWrapper, SuccessInfoStub } from '@sber-universe/om-component-library';
import { useStore } from 'effector-react';
import { personEduPlanList } from '@src/pages/EduPlansList/model';

import './model/init';

export const EduPlansListPerson = (): JSX.Element => {
  const status = useStore(personEduPlanList.$status);
  const vals = useStore(personEduPlanList.$value);
  const hasData = vals.length > 0;
  useEffect(() => {
    personEduPlanList.get();
    return () => {
      personEduPlanList.reset();
    };
  }, []);
  const statusList = [status];
  return (
    <>
      <div className="flex flex-col grow space-y-8">
        <div className="flex justify-between space-x-2 pt-4 items-center">
          <Typography as="h2" size="32px" fontWeight="semibold">
            Планы обучения
          </Typography>
        </div>

        <div className="grow">
          <LoadingWrapper loadingStatusList={statusList}>
            {hasData ? (
              <PersonEduPlanList data={vals} />
            ) : (
              <SuccessInfoStub titleParams="У вас нет доступных для просмотра планов обучения" size="large" />
            )}
          </LoadingWrapper>
        </div>
      </div>
    </>
  );
};
