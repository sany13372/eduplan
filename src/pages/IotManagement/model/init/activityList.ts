import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import { resetDomain } from '@src/pages/IotTemplateList/model';
import { activityList } from '@src/pages/IotManagement/model';
import { Activity, ActivityRow } from '@src/pages/IotManagement/model/types';
import escapeRegExp from 'lodash/escapeRegExp';

import { getActivityListQuery } from './queries';

const getChildrens = (path: string, data: Activity[]): ActivityRow[] => {
  const pattern = `^${escapeRegExp(path)}[.]{1}[a-zA-Z0-9_]*$`;
  const regex = new RegExp(pattern, 'g');
  return data.filter((e) => e.path.match(regex) && !e.isGroup) as ActivityRow[];
};

const prepareActivityItems = (initData: Activity[]): Activity[] => {
  const regex = new RegExp(`^[a-zA-Z0-9_]*$`, 'g');
  const resp: Activity[] = initData
    .filter((item) => item.path.match(regex))
    .map((e) => {
      if (e.isGroup) e.childrens = getChildrens(e.path, initData);
      return e;
    });
  return resp;
};

connectGetActionNodes({
  nodes: activityList,
  handler: async (eduPlanId) => {
    const resp = await resolved(() => getActivityListQuery(eduPlanId), { noCache: true });
    return prepareActivityItems(resp);
  },
  resetOn: [resetDomain],
});
