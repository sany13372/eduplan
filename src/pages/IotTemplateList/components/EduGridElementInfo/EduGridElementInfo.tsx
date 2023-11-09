import React, { useMemo } from 'react';
import { EduGridElement, IotTemplateData } from '@src/pages/IotTemplateList/model/types';
import { LinkButton } from '@kit-edu/button';
import { getPath, MfeRoutes } from '@constants/routes';
import { Typography } from '@kit-edu/typography';
import { Collapse, EmptyList as InfoPanel, Panel } from '@sber-universe/om-component-library';
import { IotTemplateItem } from '@src/pages/IotTemplateList/components/EduGridElementInfo/IotTemplateItem';
import { ActionMenu } from '@src/pages/IotTemplateList/components/EduGridElementInfo/ActionMenu';

// import { IotTemplateItem } from './IotTemplateItem';

type EduGridElementInfoProps = {
  eduGridElement: EduGridElement;
  iotTemplates: IotTemplateData[];
};
export const EduGridElementInfo = ({ eduGridElement, iotTemplates }: EduGridElementInfoProps): JSX.Element => {
  const { caption, planId, id } = eduGridElement;

  const addPath = useMemo(() => {
    return getPath(MfeRoutes.EDU_PLAN_INFO_IOT_TEMPLATE_CREATE, { ':planId': planId, ':gridElementId': id });
  }, [id, planId]);

  return (
    <div className="space-y-8 pl-8" data-testid="iotTemplateBlock">
      <Typography as="h3" size="24px" fontWeight="semibold">
        {caption}
      </Typography>
      {iotTemplates.length > 0 && (
        <Collapse defaultState="expanded">
          {iotTemplates.map((el) => (
            <Panel
              key={el.id}
              title={el.title}
              renderRightSideInfo={() => <></>}
              renderLeftSideInfo={() => <ActionMenu item={el} />}
            >
              <IotTemplateItem data={el} key={el.id} />
            </Panel>
          ))}
        </Collapse>
      )}

      {iotTemplates.length === 0 && (
        <InfoPanel content="Для части плана обучения не добавлены шаблоны индивидуальных образовательных траекторий" />
      )}

      <div className="flex justify-end space-x-6">
        <LinkButton size="medium" to={addPath} appearance="dark-outline">
          Добавить
        </LinkButton>
      </div>
    </div>
  );
};
