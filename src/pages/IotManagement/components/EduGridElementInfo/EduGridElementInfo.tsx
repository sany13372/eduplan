import React, { useMemo } from 'react';
import { Button } from '@kit-edu/button';
import { getPath, MfeRoutes } from '@constants/routes';
import { Typography } from '@kit-edu/typography';
import { EduGridElementData } from '@src/pages/IotManagement/model/types';
import { useStore } from 'effector-react';
import { activityList, studentTrajectoryMap } from '@src/pages/IotManagement/model';
import { useHistory } from 'react-router-dom';
import { Accordion } from '@sber-universe/om-component-library';

import { Table } from './Table';

type EduGridElementInfoProps = {
  eduGridElement: EduGridElementData;
};
export const EduGridElementInfo = ({ eduGridElement }: EduGridElementInfoProps): JSX.Element => {
  const { caption, id, iotTemplateCount, planId } = eduGridElement;
  const { data } = useStore(studentTrajectoryMap.$value);
  const activityListData = useStore(activityList.$value);
  const someRowSelected = data.some((e) => e.isSelected[id]);
  const addPath = useMemo(() => {
    return getPath(MfeRoutes.EDU_PLAN_INFO_IOT_CREATE, { ':planId': planId, ':gridElementId': id });
  }, [id, planId]);

  const history = useHistory();

  const addClickHandler = () => {
    history.push(addPath);
  };
  return (
    <Accordion params={{ defaultExpanded: false }} dataTestId="iotBlock">
      <Accordion.Panel className="flex justify-between items-center">
        <Accordion.ToggleButton disabled={!iotTemplateCount} />
        <Typography as="h4" size="16px" fontWeight="semibold" className="grow">
          {caption}
        </Typography>
        <Button size="medium" onClick={addClickHandler} disabled={!iotTemplateCount || !someRowSelected}>
          Выбрать шаблон ИОТ
        </Button>
      </Accordion.Panel>
      <Accordion.Content>
        <Table data={data} eduGridElement={eduGridElement} activityData={activityListData} />
      </Accordion.Content>
    </Accordion>
  );
};
