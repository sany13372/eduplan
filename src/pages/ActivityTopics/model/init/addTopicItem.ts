import { connectAddActionNodes } from '@utils/effector';
import { convertCreateUpdateError } from '@src/pages/ActivityTopics/model/validation';
import { addTopicItem } from '@src/pages/ActivityTopics/model';
import { resolved } from '@src/gql-client';

import { addTopicQuery } from './queries/addTopicQuery';

connectAddActionNodes({
  nodes: addTopicItem,
  handler: async (topicItem) => {
    const id = await resolved(
      () =>
        addTopicQuery({
          eduPlanRowId: topicItem.eduPlanRowId,
          title: topicItem.caption,
          partTypeId: topicItem.partType?.id ?? '',
          parentId: topicItem.parent?.id,
          shortTitle: '',
          description: '',
          hoursData: topicItem.efforts,
        }),
      { noCache: true },
    );

    return id;
  },
  convertErrors: convertCreateUpdateError,
});
