import { InfoWrapper } from '@sber-universe/om-component-library/dist/Info/InfoWrapper';
import { ReactComponent as EmptyListImage } from '@src/assets/images/info.svg';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';
import { EduPlanParams } from '@src/types';
import { Typography } from '@kit-edu/typography';
import { useIsOnlyView } from '@src/pages/Events/model/hooks';

import { IMAGE_PROPS } from './constants';

export const EmptyList = () => {
  const history = useHistory();
  const { planId } = useParams<EduPlanParams>();
  const isOnlyView = useIsOnlyView();

  const clickHandler = () => {
    history.push(getPath(MfeRoutes.EVENT_CREATE, {}, { owner: planId }));
  };
  return (
    <div className="space-y-[50px]">
      <Typography as="h2" size="32px" fontWeight="semibold">
        События
      </Typography>
      <InfoWrapper
        title="Здесь будут находиться события"
        subTitle={isOnlyView ? undefined : 'Чтобы создать событие, нажмите на кнопку «Добавить»'}
        buttonProps={
          isOnlyView
            ? undefined
            : {
                title: 'Добавить',
                onClick: clickHandler,
              }
        }
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <EmptyListImage {...IMAGE_PROPS} />
      </InfoWrapper>
    </div>
  );
};
