import { FC } from 'react';
import { LinkButton } from '@kit-edu/button';
import { getPath, MfeRoutes } from '@constants/routes';

export type ActivityTopicListActionsProps = {
  activityId: string;
  planId: string;
};

export const ActivityTopicListActions: FC<ActivityTopicListActionsProps> = ({ activityId, planId }) => {
  return (
    <div className="flex space-x-4">
      <LinkButton
        to={getPath(MfeRoutes.ACTIVITY_TOPIC_ITEM_CREATE, { ':planId': planId, ':activityId': activityId })}
        size="medium"
        appearance="light-outline"
      >
        Добавить тему
      </LinkButton>
    </div>
  );
};
