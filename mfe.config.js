module.exports = {
  exposes: {
    /** widgets
     * If you want to expose other components, you will add them here like this './MyComponent': './src/components/MyComponent',
     *     './EduProgramsWidget': './src/pages/EduProgramList/EduProgramsWidget',

     */
    './App': './src/app',
    './EduPlansListWidget': './src/pages/EduPlansList',
    './EventListWidget': './src/pages/Events',
    './ViewEventWidget': './src/pages/Events',
    './ActivityInfoExposedPages': './src/pages/ActivityManagement',
    './LessonContentExposedPages': './src/pages/LessonContent',
    './ActivityTopicManagementExposedPages': './src/pages/ActivityTopics',
    './EduPlanExposedRoutes': './src/constants/routes.exposed',
    './connectNavigation': './src/app/model/connectNavigtaion',
  },
};
