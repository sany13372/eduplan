import { query } from '@src/gql-client';
import { castNotSkeletonDeep } from 'gqty';

export const getCourseInfoList = (idList: string[]): Record<string, string> => {
  const resp = query.readCourses({
    where: {
      id: { _in: idList },
    },
  });
  const resultVal: Record<string, string> = {};
  resp?.forEach((e) => {
    const { id, title } = castNotSkeletonDeep(e);
    resultVal[id] = title ?? '';
  });
  return resultVal;
};
