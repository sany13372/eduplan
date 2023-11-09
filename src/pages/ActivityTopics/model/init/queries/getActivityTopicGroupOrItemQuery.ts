import { castNotSkeletonDeep } from 'gqty';
import { query } from '@src/gql-client';
import { parentIdOfPath } from '@utils/api';
import { UpdateTopicItem, UpdateTopicGroup } from '@src/pages/ActivityTopics/model/types';

export type UpdateTopicGroupOrItemWithParentId = (
  | { type: 'group'; value: Omit<UpdateTopicGroup, 'parent'> }
  | { type: 'item'; value: Omit<UpdateTopicItem, 'parent' | 'eduPlanRowId'> }
) & { parentId: string | null };

export const getActivityTopicGroupOrItemQuery = (id: string): UpdateTopicGroupOrItemWithParentId | null => {
  const rows = query
    .readEduPlanActivityRows({
      where: {
        id: { _eq: id },
        deletedAt: { _is_null: true },
      },
    })
    .map(castNotSkeletonDeep)
    .map((row) => {
      const efforts = row
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
        id: row.id ?? '',
        parentId: parentIdOfPath(row.path ?? ''),

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

        efforts,
      };
    });

  if (rows.length === 0) {
    return null;
  }

  const row = rows[0];

  if (row.part) {
    return {
      type: 'item',
      parentId: row.parentId,
      value: {
        id: row.id,
        caption: row.part.title,
        partType: row.part.partType,
        efforts: row.efforts,
      },
    };
  }

  if (row.partGroup) {
    return {
      type: 'group',
      parentId: row.parentId,
      value: {
        id: row.id,
        caption: row.partGroup.title,
        shortTitle: row.partGroup.shortTitle,
        componentKind: row.partGroup.componentKind,
      },
    };
  }

  return null;
};
