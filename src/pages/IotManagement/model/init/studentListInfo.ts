import { connectGetActionNodes } from '@utils/effector';
import {
  $baseInfo,
  $newFilters,
  deleteTrajectory,
  eduGridElements,
  resetDomain,
  resetNewFilterVal,
  setCheckedState,
  setNewFilterVal,
  studentTrajectoryMap,
} from '@src/pages/IotManagement/model';
import { combine, sample } from 'effector';
import { resolved } from '@src/gql-client';
import { StudentsListInfo } from '@src/pages/IotManagement/model/types';
import { getStudentsQuery } from '@src/pages/IotManagement/model/init/queries';
import { defaultPagination } from '@src/pages/IotManagement/model/constants';

connectGetActionNodes({
  nodes: studentTrajectoryMap,
  handler: async (data) => {
    const resp = await resolved(
      () => {
        const res: StudentsListInfo = getStudentsQuery({
          planId: data.planId,
          filters: data.filters,
          paginationData: data.data.pagination,
        });

        return res;
      },
      { noCache: true },
    );

    return { data: [...(data?.data?.data ?? []), ...resp.data], pagination: resp.pagination };
  },
  resetOn: [resetDomain],
});

studentTrajectoryMap.$value
  .on(setCheckedState, (state, value) => {
    return {
      pagination: state.pagination,
      data: state.data.map((e) => {
        if (!value.id || value.id === e.studentInfo.id) {
          const { isSelected } = e;
          isSelected[value.gridElementId] = value.checked;
          return { ...e, isSelected };
        }
        return e;
      }),
    };
  })
  .on(deleteTrajectory.deleteFx.doneData, (state, res) => {
    return {
      ...state,
      data: state.data.map((e) => ({ ...e, trajectoryList: e.trajectoryList.filter((tr) => tr.id !== res) })),
    };
  });

sample({
  clock: [eduGridElements.getFx.doneData, setNewFilterVal, resetNewFilterVal],
  source: combine($newFilters, $baseInfo, eduGridElements.$value, (newFilters, baseInfo, eduGridItems) => ({
    newFilters,
    baseInfo,
    eduGridItems,
  })),
  fn: (s) => {
    return {
      filters: s.newFilters,
      planId: s.baseInfo.planId,
      data: {
        pagination: defaultPagination,
        data: [],
      },
    };
  },
  filter: (s, c) => {
    // @ts-ignore
    return !c?.gridElement;
  },
  target: studentTrajectoryMap.getFx,
});
