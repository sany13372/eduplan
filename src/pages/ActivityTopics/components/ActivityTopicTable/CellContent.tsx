import { Typography } from '@kit-edu/typography';
import { EduPlanActivityParams, getPath, MfeRoutes } from '@src/constants/routes';
import { FC, ReactText, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { CellProps } from '@sber-universe/om-component-library';
import { TooltipWrapper } from '@src/pages/ActivityTopics/components/ActivityTopicTable/TooltipWrapper';
import { TopicNode, TopicRow } from '@src/pages/ActivityTopics/model/types';
import { deleteTopicRow, updatePriorityTopicItem } from '@src/pages/ActivityTopics/model';

import { Cell } from './Cell';

enum ActionKeysEnum  {
  edit = 'edit',
  remove = 'remove',
  addGroupTopic = 'addGroupTopic',
  addTopic = 'addTopic',
  up = 'up',
  down = 'down'
}

type ActionType = {
  id:ActionKeysEnum
  label:string
}

const topicGroupActions = [
  { id: ActionKeysEnum.edit, label: 'Редактировать' },
  { id: ActionKeysEnum.up, label: 'Передвинуть вверх' },
  { id: ActionKeysEnum.down, label: 'Передвинуть вниз' },
  { id: ActionKeysEnum.addGroupTopic, label: 'Добавить структурный элемент' },
  { id: ActionKeysEnum.addTopic, label: 'Добавить тему' },
  { id: ActionKeysEnum.remove, label: 'Удалить' },
];

const topicActions = [
  { id: ActionKeysEnum.edit, label: 'Редактировать' },
  { id: ActionKeysEnum.up, label: 'Передвинуть вверх' },
  { id: ActionKeysEnum.down, label: 'Передвинуть вниз' },
  { id: ActionKeysEnum.remove, label: 'Удалить' },
];

export const CellContent: FC<CellProps<TopicRow>> = ({ value, row,data }) => {
  const { activityId, planId } = useParams<EduPlanActivityParams>();
  const history = useHistory();
  const queryParam = row.original.id ? { parentId: row.original.id } : undefined;

  const [actions,setActions] = useState<ActionType[]>('leaf' ? topicActions : topicGroupActions)
  const rowsLength = data?.length || 0
  const goAddGroupTopic = () => {
    const path = getPath(
      MfeRoutes.ACTIVITY_TOPIC_GROUP_CREATE,
      { ':planId': planId, ':activityId': activityId },
      queryParam,
    );

    history.push(path);
  };

  const goAddTopic = () => {
    const path = getPath(
      MfeRoutes.ACTIVITY_TOPIC_ITEM_CREATE,
      { ':planId': planId, ':activityId': activityId },
      queryParam,
    );

    history.push(path);
  };

  const changeAction = (consistFilter:string) => {
    const filterActions = actions.filter((action) => action.id !== consistFilter)
    setActions(filterActions)
  }

  useEffect(() => {
      if (row.index === 0){
          changeAction(ActionKeysEnum.up)
      }
      if (row.index >= rowsLength - 1){
        changeAction(ActionKeysEnum.down)
      }
      if (rowsLength === 1){
        const filterActions = actions.filter((action) => action.id !== ActionKeysEnum.down && action.id !== ActionKeysEnum.up)
        setActions(filterActions)
      }
  },[row.index,rowsLength]) // eslint-disable-line

  const changePosition = (rowId:string,rows:TopicNode[],type:string) => {
    const indexFindRow = type === 'up'?row.index-1:row.index+1;
    const findElement = rows[indexFindRow]?.id
    if (findElement){
      updatePriorityTopicItem.update({firstId:rowId,secondId:findElement,eduPlanRowId:activityId})
    }
  }

  const goEdit = () => {
    const path = getPath(MfeRoutes.ACTIVITY_TOPIC_GROUP_OR_ITEM_EDIT, {
      ':planId': planId,
      ':activityId': activityId,
      ':topicId': row.original.id,
    });

    history.push(path);
  };

  const handleChangeDropdownMenu = (key: ReactText) => {
    switch (key) {
      case ActionKeysEnum.addGroupTopic:
        goAddGroupTopic();
        break;
      case ActionKeysEnum.addTopic:
        goAddTopic();
        break;
      case ActionKeysEnum.edit:
        goEdit();
        break;
      case ActionKeysEnum.remove:
        deleteTopicRow.setItem(row.original);
        break;
        case ActionKeysEnum.up:
          changePosition(row.original.id,data,ActionKeysEnum.up)
        break;
          case ActionKeysEnum.down:
          changePosition(row.original.id,data,ActionKeysEnum.down)
        break;
      default:
        break;
    }
  };

  return (
    <>
      {value ?
       <TooltipWrapper desc={value} delay={500}>
          <Typography as="span" fontWeight="semibold" size="14px" className="truncate ml-[10px]">
            {value}
          </Typography>
       </TooltipWrapper>
        :
        <Cell items={actions} onChangeDropdownMenu={handleChangeDropdownMenu}/>
      }
    </>
  );
};
