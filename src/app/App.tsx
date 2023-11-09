import React, { FC, Suspense } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { MfeSwitch } from '@baldrick/components';
import { MFE_PATH, MfeRoutes } from '@constants/routes';
import { ToastContainer } from '@kit-edu/toast';
import { NavPanel } from '@src/app/components';
import './model/init';
import '@src/styles/index.css';
import '@sber-universe/om-component-library/dist/styles.css';
import '@src/styles/common.css';
import { Preloader, AbilityContext, ability as defaultAbility } from '@sber-universe/om-component-library';
import { useBackgroundClassName } from '@utils/hooks';
import { PORTAL_ID } from '@constants/portal';
import { scrollableElementId } from '@sbo/content-constructor';

const AddEduPlan = React.lazy(() => import('@src/pages/EduPlans').then((res) => ({ default: res.AddEduPlan })));
const EduPlansManagement = React.lazy(() =>
  import('@src/pages/EduPlans').then((res) => ({ default: res.EduPlansManagement })),
);
const UpdateEduPlan = React.lazy(() => import('@src/pages/EduPlans').then((res) => ({ default: res.UpdateEduPlan })));
const ActivityManagement = React.lazy(() =>
  import('@src/pages/ActivityManagement').then((res) => ({ default: res.ActivityManagement })),
);
const CreateGroup = React.lazy(() =>
  import('@src/pages/GroupManagement').then((res) => ({ default: res.CreateGroup })),
);
const UpdateGroup = React.lazy(() =>
  import('@src/pages/GroupManagement').then((res) => ({ default: res.UpdateGroup })),
);
const ViewGroup = React.lazy(() => import('@src/pages/GroupManagement').then((res) => ({ default: res.ViewGroup })));
const CreateStudent = React.lazy(() =>
  import('@src/pages/StudentManagement').then((res) => ({ default: res.CreateStudent })),
);
const ActivityTopicManagement = React.lazy(() =>
  import('@src/pages/ActivityTopics').then((res) => ({ default: res.ActivityTopicManagement })),
);
const IotTemplateManagement = React.lazy(() =>
  import('@src/pages/IotTemplateManagement').then((res) => ({ default: res.IotTemplateManagement })),
);
const IotManagement = React.lazy(() =>
  import('@src/pages/IotManagement').then((res) => ({ default: res.IotManagement })),
);
const LessonManagement = React.lazy(() =>
  import('@src/pages/Lessons').then((res) => ({ default: res.LessonManagement })),
);
const EduPlansList = React.lazy(() => import('@src/pages/EduPlansList').then((res) => ({ default: res.EduPlansList })));
const LessonContentManagement = React.lazy(() =>
  import('@src/pages/LessonContent').then((res) => ({ default: res.LessonContentManagement })),
);

const EventManagement = React.lazy(() => import('@src/pages/Events').then((res) => ({ default: res.EventManagement })));

/**
 * При запуска с бутстрапом дополнительно использовать BrowserRouter не нужно.
 * Для запуска без бутстрапа - BrowserRouter прописан в файле bootstrap.tsx
 * Описание работы роутинга https://confluence.pcbltools.ru/confluence/pages/viewpage.action?pageId=41978295
 */

export const App: FC = () => {
  const backgroundColor = useBackgroundClassName();
  const location = useLocation();
  const isOnTestConstructorRoute = location.pathname.endsWith('/test-constructor');

  return (
    <AbilityContext.Provider value={defaultAbility}>
      <main className={`${process.env.APP_NAME_VERSION} default`}>
        <NavPanel />
        <div
          data-id={scrollableElementId}
          className={` bg-base-200 grow flex flex-col overflow-scroll ${backgroundColor}`}
        >
          <div id={PORTAL_ID} />
          <div className={`main-container container ${isOnTestConstructorRoute && `h-full m-auto p-0`}`}>
            <ToastContainer
              enableMultiContainer
              containerId="main"
              style={{ maxWidth: '100%' }}
              toastClassName="max-w-[720px]"
            />
            <Suspense fallback={<Preloader />}>
              <MfeSwitch path={MFE_PATH}>
                <Route path={MfeRoutes.EDU_PLAN_INFO_IOT_TEMPLATE_MANAGEMENT} component={IotTemplateManagement} />
                <Route path={MfeRoutes.EDU_PLAN_INFO_IOT_MANAGEMENT} component={IotManagement} />
                <Route exact path={MfeRoutes.EDU_PLAN_INFO_EDIT} component={UpdateEduPlan} />
                <Route exact path={MfeRoutes.EDU_PLAN_CREATE} component={AddEduPlan} />
                <Route exact path={MfeRoutes.EDU_PLAN_LIST} component={EduPlansList} />
                <Route path={MfeRoutes.ACTIVITY_TOPIC_ROOT} component={ActivityTopicManagement} />
                <Route path={MfeRoutes.EDU_PLAN_INFO_ACTIVITY_ROOT} component={ActivityManagement} />
                <Route exact path={MfeRoutes.EDU_PLAN_INFO_STUDENT_CREATE} component={CreateStudent} />
                <Route exact path={MfeRoutes.EDU_PLAN_INFO_GROUP_VIEW} component={ViewGroup} />
                <Route exact path={MfeRoutes.EDU_PLAN_INFO_GROUP_CREATE} component={CreateGroup} />
                <Route exact path={MfeRoutes.EDU_PLAN_INFO_GROUP_EDIT} component={UpdateGroup} />
                <Route path={MfeRoutes.EDU_PLAN_INFO_LESSON_ROOT} component={LessonManagement} />
                <Route path={MfeRoutes.EDU_PLAN_INFO_ACTIVITY_LESSON_ROOT} component={LessonManagement} />
                <Route path={MfeRoutes.EDU_PLAN_INFO_ROOT} component={EduPlansManagement} />
                <Route path={MfeRoutes.LESSON_ROOT} component={LessonContentManagement} />
                <Route path={MfeRoutes.EVENT_ROOT} component={EventManagement} />
                <Route path="" exact component={EduPlansList} />
                <Route path="" render={() => <Redirect to="/404" />} />
              </MfeSwitch>
            </Suspense>
          </div>
        </div>
      </main>
    </AbilityContext.Provider>
  );
};
