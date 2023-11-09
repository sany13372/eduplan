import { connectGetActionNodes } from '@utils/effector';
import {
  chooseStudentsInfo,
  chooseStudentsInitialInfo,
  resetDomain,
  setFilter,
} from '@src/widgets/ChooseStudents/model';
import { resolved } from '@src/gql-client';
import { getStudentsQuery } from '@src/widgets/ChooseStudents/model/init/queries';
import { defaultStudentListInfo } from '@src/widgets/ChooseStudents/model/constants';
import { ChooseStudentsInfo, GetStudentsParams } from '@src/widgets/ChooseStudents/model/types';

const effectHandler = async (params: GetStudentsParams): Promise<ChooseStudentsInfo> => {
  const resp = await resolved(() => getStudentsQuery(params), { noCache: true });
  return {
    data: [...params.data.data, ...resp.students],
    pagination: {
      pageSize: params.data.pagination.pageSize,
      count: resp.count,
      pageIndex: params.data.pagination.pageIndex + 1,
    },
  };
};
connectGetActionNodes({
  nodes: chooseStudentsInfo,
  handler: effectHandler,
  resetOn: [resetDomain],
});

chooseStudentsInfo.$value.on(setFilter, () => {
  return defaultStudentListInfo;
});

chooseStudentsInfo.$status.reset(setFilter);

connectGetActionNodes({
  nodes: chooseStudentsInitialInfo,
  handler: effectHandler,
  resetOn: [resetDomain],
});

chooseStudentsInfo.$value.on(chooseStudentsInitialInfo.getFx.doneData, (_, val) => val);
