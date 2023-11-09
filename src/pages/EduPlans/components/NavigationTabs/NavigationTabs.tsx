import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Tabs, TabsItemProps } from '@sber-universe/om-component-library';

const tabs: TabsItemProps[] = [
  {
    id: MfeRoutes.EDU_PLAN_INFO_VIEW,
    caption: 'План обучения',
    dataTestId: 'mainTab',
  },
  {
    id: MfeRoutes.EDU_PLAN_DESC_ROOT,
    caption: 'Витрина',
    dataTestId: 'descTab',
  },
  {
    id: MfeRoutes.EDU_PLAN_TEACHERS,
    caption: 'Преподаватели',
    dataTestId: 'teacherTab',
  },
  {
    id: MfeRoutes.EDU_PLAN_INFO_STUDENT_GROUP_LIST,
    caption: 'Обучающиеся',
    dataTestId: 'studentGroupTab',
  },
  {
    id: MfeRoutes.EDU_PLAN_INFO_IOT_TEMPLATE,
    caption: 'Шаблоны ИОТ',
    dataTestId: 'iotTemplateTab',
  },
  {
    id: MfeRoutes.EDU_PLAN_INFO_IOT,
    caption: 'ИОТ обучающихся',
    dataTestId: 'iotTab',
  },
  {
    id: MfeRoutes.EDU_PLAN_EVENTS,
    caption: 'События',
    dataTestId: 'eventTab',
  },
];

export const NavigationTabs: FC<{ isDark: boolean }> = ({ isDark }) => {
  const [navTabs, setNavTabs] = useState<TabsItemProps[]>([]);
  const { planId } = useParams<{ planId: string }>();
  const history = useHistory();
  const match = useRouteMatch(tabs.map((e) => getPath(e.id as MfeRoutes) as string));

  useEffect(() => {
    if (planId) {
      const newTabs = tabs.map((e) => ({
        id: getPath(e.id as MfeRoutes, { ':planId': planId }),
        caption: e.caption,
        dataTestId: e.dataTestId,
      }));
      setNavTabs(newTabs);
    }
  }, [planId]);

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
