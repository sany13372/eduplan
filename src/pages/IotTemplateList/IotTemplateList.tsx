import { Typography } from '@kit-edu/typography';
import React, { useEffect } from 'react';
import './model/init';
import { useParams } from 'react-router-dom';
import { EduPlanParams } from '@constants/routes';
import {
  $filteredEduGridElementStore,
  $filteredIotTemplateStore,
  eduGridElementStore,
  iotTemplateStore,
} from '@src/pages/IotTemplateList/model';
import { useStore } from 'effector-react';
import { DeleteIotTemplateConfirmDialog, EduGridElementInfo, Filters } from '@src/pages/IotTemplateList/components';
import { useMfeBackGround } from '@utils/hooks';
import { LoadingWrapper } from '@sber-universe/om-component-library';

export const IotTemplateList = (): JSX.Element => {
  const { planId } = useParams<EduPlanParams>();

  const status = useStore(eduGridElementStore.$status);
  const filteredEduGridElementStore = useStore($filteredEduGridElementStore);
  const templateListStatus = useStore(iotTemplateStore.$status);
  const filteredTemplateListData = useStore($filteredIotTemplateStore);

  useEffect(() => {
    eduGridElementStore.get(planId);
    iotTemplateStore.get(planId);
  }, [planId]);

  useMfeBackGround('gray');
  return (
    <>
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between">
          <Typography as="h2" size="32px" fontWeight="semibold">
            Шаблоны индивидуальных образовательных траекторий
          </Typography>
        </div>
        <LoadingWrapper loadingStatusList={[status, templateListStatus]} errorStatusList={[status, templateListStatus]}>
          <div className="space-y-8">
            <Filters />
            {filteredEduGridElementStore.map((e) => (
              <EduGridElementInfo
                eduGridElement={e}
                key={e.id}
                iotTemplates={filteredTemplateListData.filter((el) => el.eduGridElementId === e.id)}
              />
            ))}
          </div>
        </LoadingWrapper>
      </div>
      <DeleteIotTemplateConfirmDialog />
    </>
  );
};
