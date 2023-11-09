export const defaultLessonKindConfig = {
  lessonId: '',
  configuration: {
    base: [],
    media: [],
    interactive: [],
  },
};

export const ContentConstructorUrls = {
  FILE_PIPELINE_SERVICE_URL: process.env.MFE_FILE_PIPELINE_SERVICE_URL,
  CONTENT_SERVICE_URL: process.env.MFE_CONTENT_CONSTRUCTOR_SERVICE_URL,
};
