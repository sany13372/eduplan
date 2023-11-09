import { connectAddActionNodes } from '@utils/effector';
import { convertCreateUpdateError } from '@src/pages/ActivityTopics/model/validation';
import { addTopicGroup } from '@src/pages/ActivityTopics/model';
import { resolved } from '@src/gql-client';

import { addTopicGroupQuery } from './queries/addTopicGroupQuery';

connectAddActionNodes({
  nodes: addTopicGroup,
  handler: async (topicGroup) => {
    const id = await resolved(
      () =>
        addTopicGroupQuery({
          eduPlanRowId: topicGroup.eduPlanRowId,
          title: topicGroup.caption,
          shortTitle: topicGroup.shortTitle,
          componentKindId: topicGroup.componentKind!.id,
          parentId: topicGroup.parent?.id,
        }),
      { noCache: true },
    );

    return id;
  },
  convertErrors: convertCreateUpdateError,
});
