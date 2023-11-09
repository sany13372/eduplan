import { resolved } from '@src/gql-client';
import {
  selectedTopicGroupOrItemStore,
  updateTopicItem,
  updateTopicGroup,
  UpdateGroupOrItem,
} from '@src/pages/ActivityTopics/model';
import { connectGetActionNodes } from '@utils/effector';

import { getActivityTopicGroupOrItemQuery } from './queries';

connectGetActionNodes({
  nodes: selectedTopicGroupOrItemStore,
  handler: async (id): Promise<UpdateGroupOrItem | null> => {
    const groupOrItem = await resolved(() => getActivityTopicGroupOrItemQuery(id), { noCache: true });
    if (!groupOrItem) {
      return null;
    }

    const parent = groupOrItem.parentId
      ? await resolved(() => getActivityTopicGroupOrItemQuery(groupOrItem.parentId!), { noCache: true })
      : null;
    const parentRef =
      parent && parent.type === 'group'
        ? {
            id: parent.value.id,
            caption: `${parent.value.componentKind.caption}: ${parent.value.caption}`,
          }
        : undefined;

    if (groupOrItem.type === 'item') {
      return {
        type: 'item',
        value: { ...groupOrItem.value, parent: parentRef },
      };
    }
    return {
      type: 'group',
      value: { ...groupOrItem.value, parent: parentRef },
    };
  },
  resetOn: [updateTopicItem.reset, updateTopicGroup.reset],
});
