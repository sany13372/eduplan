import {
  $drawerInfoMapStore,
  createStreamFx,
  linkStudents,
  linkTeachers,
  resetDomain,
  saveScoreInfoFx,
  setDrawerInfo,
  updateStreamFx,
} from '@src/pages/LessonSettings/model';

$drawerInfoMapStore
  .on(setDrawerInfo, (state, params) => ({ ...state, [params.type]: params.val }))
  .on(createStreamFx.doneData, (state, val) => {
    return { ...state, CREATE_STREAM: null, VIEW_STREAM: { id: val.id, lessonId: val.lessonId, themeId: val.themeId } };
  })
  .on(updateStreamFx.doneData, (state) => {
    return { ...state, UPDATE_STREAM_TITLE: null, UPDATE_STREAM_DATES: null };
  })
  .on(saveScoreInfoFx.doneData, (state) => {
    return { ...state, UPDATE_SCORE_INFO: null };
  })
  .on(linkTeachers.addFx.doneData, (state) => {
    const stream = state['LINK_TEACHERS'];
    return { ...state, LINK_TEACHERS: null, VIEW_LINKED_TEACHERS: stream };
  })
  .on(linkStudents.addFx.doneData, (state) => {
    const stream = state['LINK_STUDENTS'];
    return { ...state, LINK_STUDENTS: null, VIEW_LINKED_STUDENTS: stream };
  })
  .reset(resetDomain);
