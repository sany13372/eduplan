import { ScoreInfo, ScoreInfoMap, Stream, StreamMap } from '@src/pages/LessonSettings/model/types';
import { FullName, Teacher } from '@src/types';
import flatten from 'lodash/flatten';
import orderBy from 'lodash/orderBy';

export const streamMapToList = (obj: StreamMap): Stream[] => {
  return flatten(Object.values(obj));
};

export const streamListToMap = (arr: Stream[]): StreamMap => {
  const result: StreamMap = {};
  arr.forEach((stream) => {
    if (result[stream.lessonId]) result[stream.lessonId].push(stream);
    else result[stream.lessonId] = [stream];
  });
  return result;
};

export const scoreInfoMapToList = (obj: ScoreInfoMap): ScoreInfo[] => {
  return flatten(Object.values(obj));
};

export const scoreInfoListToMap = (arr: ScoreInfo[]): ScoreInfoMap => {
  const result: ScoreInfoMap = {};
  arr.forEach((scoreInfo) => {
    result[scoreInfo.lessonId] = scoreInfo;
  });
  return result;
};

const getShortString = (val: string): string => {
  return val ? `${val.slice(0, 1)}.` : '';
};
export const fullNameToShortFullName = (fullName: string): string => {
  const [lastName = '', firstName = '', middleName = ''] = fullName.split(' ');
  return `${lastName} ${getShortString(firstName)} ${getShortString(middleName)}`;
};

export const fullNameObjToString = ({ lastName, firstName, middleName }: FullName) => {
  return [lastName, firstName, middleName].filter((e) => e).join(' ');
};

export const sortTeacherList = (arr: Teacher[]): Teacher[] => {
  return orderBy(arr, ['fullName.lastName', 'fullName.firstName', 'fullName.middleName'], 'asc');
};
