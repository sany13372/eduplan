import { TopicNode } from '@src/pages/ActivityTopics/model/types';

export function removeActivityTopicById(array: TopicNode[], id: string) {
  return array.some((o, i, a) => {
    if (o.id === id) a.splice(i, 1);
    else if (o.node === 'branch') removeActivityTopicById(o.nodes || [], id);
    return false;
  });
}
