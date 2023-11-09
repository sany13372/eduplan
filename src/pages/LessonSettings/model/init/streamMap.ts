import {
  $streamMapStore,
  createStreamFx,
  deleteLinkedStudent,
  deleteLinkedTeacher,
  deleteStream,
  getInitDataFx,
  linkStudents,
  linkTeachers,
  resetDomain,
  toggleStreamIsPublFx,
  updateStreamFx,
} from '@src/pages/LessonSettings/model';
import { fullNameObjToString, streamListToMap } from '@src/pages/LessonSettings/model/utils';

$streamMapStore
  .on(getInitDataFx.doneData, (_, val) => {
    return streamListToMap(val.streams);
  })
  .on(createStreamFx.doneData, (state, val) => {
    const lessonStreamList = state[val.lessonId] ?? [];
    lessonStreamList.push(val);
    return { ...state, [val.lessonId]: lessonStreamList };
  })
  .on([toggleStreamIsPublFx.doneData, updateStreamFx.doneData], (state, val) => {
    const lessonStreamList = state[val.lessonId] ?? [];
    const streamInd = lessonStreamList.findIndex((e) => e.id === val.id);
    if (streamInd === -1) lessonStreamList.push(val);
    else lessonStreamList.splice(streamInd, 1, val);
    return { ...state, [val.lessonId]: lessonStreamList };
  })
  .on(deleteStream.deleteFx.done, (state, { params }) => {
    return { ...state, [params.lessonId]: (state[params.lessonId] ?? []).filter((e) => e.id !== params.id) };
  })
  .on(linkTeachers.addFx.done, (state, { params }) => {
    const { lessonId, id: streamId } = params.stream;
    const lessonStreamList = state[lessonId] ?? [];
    const fullNameList = params.teachers.map((e) => fullNameObjToString(e.fullName));
    return {
      ...state,
      [lessonId]: lessonStreamList.map((e) => {
        return e.id !== streamId ? e : { ...e, teacherList: fullNameList.sort() };
      }),
    };
  })
  .on(deleteLinkedTeacher.deleteFx.done, (state, { params }) => {
    const { lessonId, id: streamId } = params.stream;
    const lessonStreamList = state[lessonId] ?? [];
    const { fullName } = params.teacher;
    const fullNameItem = fullNameObjToString(fullName);
    return {
      ...state,
      [lessonId]: lessonStreamList.map((e) => {
        if (e.id !== streamId) return e;
        const ind = e.teacherList.findIndex((teacher) => teacher === fullNameItem);
        if (ind > -1) e.teacherList.splice(ind, 1);
        return e;
      }),
    };
  })
  .on(linkStudents.addFx.done, (state, { params, result }) => {
    const { lessonId, id: streamId } = params.stream;
    const lessonStreamList = state[lessonId] ?? [];
    return {
      ...state,
      [lessonId]: lessonStreamList.map((e) => {
        return e.id !== streamId ? e : { ...e, studentCount: e.studentCount + Number.parseInt(result, 10) };
      }),
    };
  })
  .on(deleteLinkedStudent.deleteFx.done, (state, { params }) => {
    const { lessonId, id: streamId } = params.stream;
    const lessonStreamList = state[lessonId] ?? [];
    return {
      ...state,
      [lessonId]: lessonStreamList.map((e) => {
        if (e.id !== streamId) return e;
        return { ...e, studentCount: e.studentCount - 1 };
      }),
    };
  })
  .reset(resetDomain);
