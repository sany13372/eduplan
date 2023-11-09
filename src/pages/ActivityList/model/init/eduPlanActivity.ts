import { forward } from 'effector';
import { resolved } from '@src/gql-client';
import escapeRegExp from 'lodash/escapeRegExp';
import {
  $eduPlanActivityList,
  deleteEduPlanRowFx,
  getEduPlanActivityList,
  getEduPlanActivityListFx,
  resetDomainData,
} from '@src/pages/ActivityList/model';
import { getEduPlanActivityListQuery } from '@src/pages/ActivityList/model/init/queries';
import {
  EduGridGroupEl,
  EduGridItem,
  EduGridItemEl,
  EffortParams,
  RawEffort,
} from '@src/pages/ActivityList/model/types';
import { flatten, isEqual, uniqWith } from 'lodash';
import { totalEffort } from '@src/pages/ActivityList/model/effforts';

const getChildrens = (path: string, data: EduGridItem[]): EduGridItemEl[] => {
  const pattern = `^${escapeRegExp(path)}[.]{1}[a-zA-Z0-9_]*$`;
  const regex = new RegExp(pattern, 'g');
  return data.filter((e) => e.path.match(regex) && !e.isGroup) as EduGridItemEl[];
};

const getEffortParamsList = (efforts: RawEffort[]): EffortParams[] => {
  return uniqWith(
    efforts.map(({ lessonKindId, workKindId }) => ({
      lessonKindId,
      workKindId,
    })),
    isEqual,
  );
};

const getTotalEffortList = (items: EduGridItemEl[]): RawEffort[] => {
  return flatten(items.map((children) => children.efforts));
};

const filterEffortsByParams = (efforts: RawEffort[], params: EffortParams) => {
  const { workKindId, lessonKindId } = params;
  return efforts.filter((el) => el.lessonKindId === lessonKindId && el.workKindId === workKindId);
};
const summarizeEfforts = (childrens: EduGridItemEl[]): RawEffort[] => {
  const efforts: RawEffort[] = getTotalEffortList(childrens);
  const errortGroups: EffortParams[] = getEffortParamsList(efforts);

  const resp: RawEffort[] = errortGroups.map((er) => {
    const effortsList = filterEffortsByParams(efforts, er);
    return { ...er, minutesAmount: totalEffort(effortsList) };
  });
  return resp;
};

const getGroupEfforts = (e: EduGridGroupEl): RawEffort[] => {
  const { childrens, componentKind } = e;
  if (childrens.length === 0) return [];

  return componentKind === 'opt-module' ? childrens[0].efforts : summarizeEfforts(childrens);
};

const isInvalidGroup = (e: EduGridGroupEl): boolean => {
  const efforts: RawEffort[] = getTotalEffortList(e.childrens);
  const errortGroups: EffortParams[] = getEffortParamsList(efforts);

  const effortsCount = efforts.length;
  const validCount = e.childrens.length * errortGroups.length;

  if (effortsCount !== validCount) return true;
  return errortGroups.some((er) => {
    const effortsList = filterEffortsByParams(efforts, er);
    const invalidLen = effortsList.length < e.childrens.length;
    const invalidVals = uniqWith(effortsList, isEqual).length > 1;
    return invalidLen || invalidVals;
  });
};

const prepareEduGridItems = (initData: EduGridItem[]): EduGridItem[] => {
  const regex = new RegExp(`^[a-zA-Z0-9_]*$`, 'g');
  const resp: EduGridItem[] = initData
    .filter((item) => item.path.match(regex))
    .map((e) => {
      if (e.isGroup) {
        e.childrens = getChildrens(e.path, initData);
        e.efforts = getGroupEfforts(e);
        e.isInvalid = e.componentKind === 'opt-module' ? isInvalidGroup(e) : false;
        e.childrens = e.childrens.map((el) => ({ ...el, isInvalid: e.isInvalid }));
      }
      return e;
    });
  return resp;
};

forward({
  from: getEduPlanActivityList,
  to: getEduPlanActivityListFx,
});

getEduPlanActivityListFx.use(async ({ eduGridId, eduProgId, eduPlanId }) => {
  const resp = await resolved(() => getEduPlanActivityListQuery(eduProgId, eduGridId, eduPlanId), { noCache: true });
  return prepareEduGridItems(resp);
});

const removeByPath = (data: EduGridItem[], path: string[]): EduGridItem[] => {
  if (path.length > 0) {
    const itemId = path[0];
    const newPath = path.slice(1);
    return newPath.length === 0
      ? data.filter((e) => e.id !== itemId)
      : (data.map((e) => {
          if (e.id === itemId && e.isGroup)
            return {
              ...e,
              childrens: removeByPath(e.childrens, newPath),
            };
          return e;
        }) as EduGridItem[]);
  }
  return data;
};

$eduPlanActivityList
  .on(getEduPlanActivityListFx.doneData, (_, res) => {
    return res;
  })
  .on(deleteEduPlanRowFx.doneData, (state, res) => {
    // const regex = new RegExp(`^${escapeRegExp(res.path as string)}.*$`, 'g');
    const path = res.path.split('.');
    // if (path.length === 1) return state.filter((e) => e.id !== res.id);
    // console.log({ state, res });
    return removeByPath(state, path);
  })
  .reset(resetDomainData);
