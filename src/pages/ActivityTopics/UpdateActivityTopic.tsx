import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { TopicRouteParams } from '@constants/routes';
import { Typography } from '@kit-edu/typography';

import { selectedTopicGroupOrItemStore, updateTopicGroup, updateTopicItem } from './model';
import { UpdateActivityTopicItem } from './UpdateActivityTopicItem';
import { UpdateActivityTopicGroup } from './UpdateActivityTopicGroup';

export const UpdateActivityTopic: FC = () => {
  const { topicId } = useParams<TopicRouteParams>();

  const topicGroupOrItem = useStore(selectedTopicGroupOrItemStore.$value);
  const topicGroupOrItemStatus = useStore(selectedTopicGroupOrItemStore.$status);

  const isLoading = !topicGroupOrItem || topicGroupOrItemStatus === 'pending';

  useEffect(() => {
    return () => {
      updateTopicGroup.reset();
      updateTopicItem.reset();
    };
  }, []);

  useEffect(() => {
    selectedTopicGroupOrItemStore.get(topicId);
  }, [topicId]);

  if (isLoading) {
    return (
      <Typography as="p" size="12px">
        Загрузка...
      </Typography>
    );
  }

  if (topicGroupOrItem && topicGroupOrItem.type === 'item') {
    return <UpdateActivityTopicItem topicItem={topicGroupOrItem.value} />;
  }
  if (topicGroupOrItem && topicGroupOrItem.type === 'group') {
    return <UpdateActivityTopicGroup topicGroup={topicGroupOrItem.value} />;
  }
  return <></>;
};
