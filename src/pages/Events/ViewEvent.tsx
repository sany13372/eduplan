import React, { useEffect, useState } from 'react';
import { resetMfeBackGround, resetNavigationInfo, setMfeBackGround, setNavigationInfo } from '@src/app/model';
import { TabType } from '@src/pages/Events/components';
import { getPath, MfeRoutes } from '@constants/routes';
import { useBackgroundClassName } from '@utils/hooks';
import { PageTitleContainer, Portal } from '@sber-universe/om-component-library';
import { Typography } from '@kit-edu/typography';
import { ViewEventDefault } from '@src/pages/Events/ViewEventDefault';
import { PORTAL_ID } from '@constants/portal';

export const ViewEvent = () => {
  const [title, setTitle] = useState('');
  const onSelectedTabChange = (val: TabType) => {
    setMfeBackGround(val === 'info' ? 'white' : 'gray');
  };
  const backgroundColor = useBackgroundClassName();

  useEffect(() => {
    return () => {
      resetNavigationInfo();
      resetMfeBackGround();
    };
  }, []);

  const onInfoUpdate = (data: { ownerId: string; title: string }) => {
    const { ownerId, title: pageTitle } = data;
    setTitle(pageTitle);
    setNavigationInfo({
      to: getPath(MfeRoutes.EDU_PLAN_EVENTS, { ':planId': ownerId }),
      label: 'К списку событий',
    });
  };
  return (
    <>
      <Portal portalId={PORTAL_ID}>
        <PageTitleContainer>
          <Typography fontWeight="semibold" size="32px" color="white">
            {title}
          </Typography>
        </PageTitleContainer>
      </Portal>
      <ViewEventDefault
        onTabChange={onSelectedTabChange}
        onInfoUpdate={onInfoUpdate}
        background={backgroundColor}
        isOnlyView={false}
      />
    </>
  );
};
