import { connectGetActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { activityStore, resetDomain } from '@src/pages/IotTemplateManagement/model';
import { Activity, ActivityRow } from '@src/pages/IotTemplateManagement/model/types';
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
      if (e.isGroup) {
        e.childrens = getChildrens(e.path, initData);
        e.childrens.forEach((el) => {
          // eslint-disable-next-line no-param-reassign
          el.parentGroupInfo = {
            id: e.id,
            componentKind: e.componentKind,
          };
        });
      }
      return e;
    });
  return resp;
};
connectGetActionNodes({
  nodes: activityStore,
  handler: async (params) => {
    const resp = await resolved(() => getActivityListQuery(params), { noCache: true });
    return prepareActivityItems(resp);
  },
  resetOn: [resetDomain],
});
