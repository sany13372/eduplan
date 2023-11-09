import sortBy from 'lodash/sortBy';
import { castNotSkeletonDeep } from 'gqty';
import { query } from '@src/gql-client';
import { parentIdOfPath } from '@utils/api';
import {
  RawEffort,
  TopicNode,
  TopicNodeBranch,
  TopicNodeCommon,
  TopicNodeLeaf,
} from '@src/pages/ActivityTopics/model/types';

type Row = {
  node: 'branch' | 'leaf';
  id: string;
  parentId: string | null;
  activityId: string;
  priority: number;
  title: string;
  shortTitle: string;
  hours: RawEffort[];
  partType: { id: string; caption: string } | undefined;
  componentKind: { id: string; caption: string } | undefined;
};

const getAllActivityRows = (activityId: string, branchesOnly: boolean): Row[] => {
  return query
    .readEduPlanActivityRows({
      where: {
        eduPlanRowId: { _eq: activityId },
        deletedAt: { _is_null: true },
        ...(branchesOnly ? { isGroupItem: { _eq: true } } : {}),
      },
    })
    .map(castNotSkeletonDeep)
    .map((row) => {
      const hours = row
        .activityRowHours({
          where: {
            deletedAt: { _is_null: true },
          },
        })
        .map(castNotSkeletonDeep)
        .map((hour) => ({
          lessonKindId: hour.lessonKindId ?? '',
          minutesAmount: hour.minutesAmount ?? 0,
        }));

      const { part } = row;
      const partType = part?.eduPlanActivityPartTypeSetting?.eduPlanActivityPartType;

      const { partGroup } = row;
      const partGroupComponentKind = partGroup?.eduPlanActivityComponentKindSetting?.eduPlanActivityComponentKind;

      return {
        row: {
          id: row.id ?? '',
          parentId: parentIdOfPath(row.path ?? ''),
          priority: row.priority ?? 0,
          hours,
        },

        part: part && {
          title: part.title ?? '',
          partType: {
            id: partType?.id ?? '',
            caption: partType?.title ?? '',
          },
        },

        partGroup: partGroup && {
          title: partGroup.title ?? '',
          shortTitle: partGroup.shortTitle ?? '',
          componentKind: {
            id: partGroupComponentKind?.id ?? '',
            caption: partGroupComponentKind?.title ?? '',
          },
        },
      };
    })
    .filter(({ part, partGroup }) => Boolean(part) || Boolean(partGroup))
    .map(
      ({ row, part, partGroup }) =>
        ({
          activityId,
          ...row,
          node: part ? 'leaf' : 'branch',
          ...(part || partGroup),
        } as Row),
    );
};

const sort = (rows: Row[]) => sortBy(rows, (r) => r.priority);

const convertRowsToNodes = (rows: Row[], parentId: string | null): TopicNode[] => {
  const siblingRows = sort(rows.filter((row) => row.parentId === parentId));

  return siblingRows.map((row) => {
    const common: TopicNodeCommon = {
      id: row.id,
      activityId: row.activityId,
      caption: row.title,
      shortTitle: row.shortTitle,
      efforts: row.hours,
    };
    return row.node === 'leaf'
      ? ({
          ...common,
          node: 'leaf',
          partType: {
            id: row.partType?.id ?? '',
            caption: row.partType?.caption ?? '',
          },
        } as TopicNodeLeaf)
      : ({
          ...common,
          node: 'branch',
          caption: `${row?.componentKind?.caption ?? ''}: ${row.title}`,
          componentKind: {
            id: row.componentKind?.id ?? '',
            caption: row.componentKind?.caption ?? '',
          },
          nodes: convertRowsToNodes(rows, row.id /* parentId */),
        } as TopicNodeBranch);
  });
};

const treeToList = (nodes: TopicNode[]): TopicNode[] => {
  const visit = (tree: TopicNode, list: TopicNode[]) => {
    list.push(tree);

    if (tree.node === 'branch') {
      tree.nodes.forEach((node) => visit(node, list));
    }
  };

  const flat: TopicNode[] = [];
  nodes.forEach((node) => visit(node, flat));
  return flat;
};

export type GetActivityTopicNodesQueryArgs = {
  activityId: string;
  branchesOnly: boolean;
  flatten: boolean;
};

export const getActivityTopicNodesQuery = ({
  activityId,
  branchesOnly,
  flatten,
}: GetActivityTopicNodesQueryArgs): TopicNode[] => {
  const rows = getAllActivityRows(activityId, branchesOnly);
  const nodes = convertRowsToNodes(rows, null /* parentId */);

  return flatten ? treeToList(nodes) : nodes;
};
