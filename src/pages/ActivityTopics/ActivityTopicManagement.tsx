import { FC } from 'react';
import { Route } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';
import { SwitchWithDefault } from '@sber-universe/om-component-library';

import { AddActivityTopicItem } from './AddActivityTopicItem';
import { AddActivityTopicGroup } from './AddActivityTopicGroup';
import { UpdateActivityTopic } from './UpdateActivityTopic';

import './model/init';

export const ActivityTopicManagement: FC = () => {
  return (
    <SwitchWithDefault>
      <Route exact path={getPath(MfeRoutes.ACTIVITY_TOPIC_ITEM_CREATE)} component={AddActivityTopicItem} />
      <Route exact path={getPath(MfeRoutes.ACTIVITY_TOPIC_GROUP_CREATE)} component={AddActivityTopicGroup} />
      <Route exact path={getPath(MfeRoutes.ACTIVITY_TOPIC_GROUP_OR_ITEM_EDIT)} component={UpdateActivityTopic} />
    </SwitchWithDefault>
  );
};
