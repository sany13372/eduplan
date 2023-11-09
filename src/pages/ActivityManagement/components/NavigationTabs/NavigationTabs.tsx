import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Tabs, TabsItemProps } from '@sber-universe/om-component-library';

const tabs: TabsItemProps[] = [
  {
    id: MfeRoutes.EDU_PLAN_INFO_ACTIVITY_VIEW,
    caption: 'Структура и темы',
  },
  {
    id: MfeRoutes.EDU_PLAN_INFO_ACTIVITY_LESSON_INFO,
    caption: 'Занятия',
  },

  {
    id: MfeRoutes.EDU_PLAN_INFO_ACTIVITY_SETTINGS_INFO,
    caption: 'Настройки обучения',
  },
];

export const NavigationTabs: FC<{ isDark: boolean }> = ({ isDark }) => {
  const [navTabs, setNavTabs] = useState<TabsItemProps[]>([]);
  const { planId, activityId } = useParams<{ planId: string; activityId: string }>();
  const history = useHistory();
  const match = useRouteMatch(tabs.map((e) => getPath(e.id as MfeRoutes) as string));

  useEffect(() => {
    if (planId && activityId) {
      const newTabs = tabs.map((e) => ({
        id: getPath(e.id as MfeRoutes, { ':planId': planId, ':activityId': activityId }),
        caption: e.caption,
      }));
      setNavTabs(newTabs);
    }
  }, [activityId, planId]);

  const tabChangeHandler = (itemId: React.ReactText) => {
    history.push(itemId as string);
  };
  const activeItem = useMemo(() => navTabs.find((e) => e.id === match?.url), [match?.url, navTabs]);

  return (
    <div className="overflow-auto">
      {navTabs.length > 0 && (
        <Tabs
          items={navTabs}
          onChange={tabChangeHandler}
          currentItemId={activeItem?.id}
          colorMode={isDark ? 'dark' : 'default'}
        />
      )}
    </div>
  );
};
