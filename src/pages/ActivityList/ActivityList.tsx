import { LoadingOverlay } from '@sber-universe/om-component-library';
import React, { useEffect, useMemo, useState } from 'react';
import { useStore } from 'effector-react';
import { ErrorMessage } from '@src/components';
import {
  $eduGridElementList,
  $eduGridElementStatus,
  $eduPlanActivityList,
  $eduPlanActivityStatus,
  effortUnitStore,
  getEduGridElementList,
  getEduPlanActivityList,
  grouppedLessonKindsStore,
  resetDomainData,
} from '@src/pages/ActivityList/model';
import { EduGridElement } from '@src/pages/ActivityList/model/types';
import { defaultEduGridElement } from '@src/pages/ActivityList/model/constants';
import '@src/pages/ActivityList/model/init';
import {
  ComboBoxFilter,
  DeleteActivityItem,
  EduGridElementInfo,
  PeriodListManagement,
} from '@src/pages/ActivityList/components';
import { addErrorToast } from '@src/app/model';

export type ActivityListProps = {
  eduGridId: string;
  eduProgId: string;
  eduPlanId: string;
};
export const ActivityList = ({ eduGridId, eduProgId, eduPlanId }: ActivityListProps): JSX.Element => {
  const [selectedOptions, setSelectedOptions] = useState<EduGridElement[]>([defaultEduGridElement]);

  const updateSelectedOptionsList = (data: EduGridElement[]) => {
    setSelectedOptions(data);
  };

  const eduGridElementListDefault = useStore($eduGridElementList);
  const activityList = useStore($eduPlanActivityList);

  const status = useStore($eduPlanActivityStatus);
  const eduGridElementListStatus = useStore($eduGridElementStatus);
  const effortUnitStatus = useStore(effortUnitStore.$status);

  useEffect(() => {
    if (eduGridElementListStatus === 'fail') addErrorToast({});
  }, [eduGridElementListStatus]);

  useEffect(() => {
    getEduGridElementList({ eduGridId, eduProgId, eduPlanId });
    grouppedLessonKindsStore.get(eduProgId);
    effortUnitStore.get(eduPlanId);
  }, [eduGridId, eduPlanId, eduProgId]);

  useEffect(() => {
    if (effortUnitStatus === 'done') getEduPlanActivityList({ eduGridId, eduProgId, eduPlanId });
  }, [eduGridId, eduPlanId, eduProgId, effortUnitStatus]);
  useEffect(() => resetDomainData, []);

  const items = useMemo(() => {
    const elIdList = selectedOptions.map((e) => e.id);
    const showAll = elIdList.includes(defaultEduGridElement.id);
    let resp = eduGridElementListDefault;
    if (!showAll) resp = eduGridElementListDefault.filter((e) => elIdList.includes(e.id));
    return resp;
  }, [eduGridElementListDefault, selectedOptions]);

  if (status === 'pending') return <LoadingOverlay loading />;

  if (status === 'fail') return <ErrorMessage />;

  const drawContent = (data: EduGridElement[]) => {
    return data.map((e) => (
      <EduGridElementInfo
        activityList={activityList}
        key={e.id}
        title={e.caption}
        eduPlanId={eduPlanId}
        eduProgId={eduProgId}
        gridElementId={e.id as string}
      />
    ));
  };

  return (
    <>
      <div className="space-y-[50px]">
        <div className="w-full max-w-[480px]">
          <ComboBoxFilter selectedOptions={selectedOptions} onChangeCallback={updateSelectedOptionsList} />
        </div>
        <div className="space-y-8 mb-32">{drawContent(items)}</div>
      </div>
      <DeleteActivityItem />
      <PeriodListManagement />
    </>
  );
};
