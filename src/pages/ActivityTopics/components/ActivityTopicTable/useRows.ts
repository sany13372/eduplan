import { normalizeAndTotalEffortsInMinutes } from '@src/pages/ActivityTopics/model/efforts';
import { TopicRow, WorkKind, TopicNode } from '@src/pages/ActivityTopics/model/types';
import { useMemo } from 'react';

type TCreateRows = (topicNodes: TopicNode[], workKinds: WorkKind[]) => TopicRow[];

const createRows: TCreateRows = (topicNodes, workKinds) => {
  const mapTopic = (topic: TopicNode): TopicRow => {

    const efforts = normalizeAndTotalEffortsInMinutes(topic.efforts, workKinds);

    return {
      expanded: false,
      id: topic.id,
      activityId: topic.activityId,
      node: topic.node,
      title: topic.caption,
      efforts,
    };
  };

  const mapTopics = (topics: TopicNode[]) => topics.map((topic) => mapTopic(topic));

  return mapTopics(topicNodes);
};

export const useRows: TCreateRows = (topicNodes, workKinds) =>
  useMemo(() => createRows(topicNodes, workKinds), [topicNodes, workKinds]);
