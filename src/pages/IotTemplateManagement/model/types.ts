import { ReactText } from 'react';

export type Row = {
  id: string;
  eduGridElementId: string;
  isGroup: boolean;
  activityId: ReactText;
  activityTitle: string;
  priority?: number | null;
  path: string;
};
export type ParentGroupInfo = Pick<GroupRow, 'componentKind' | 'id'>;

export type ActivityRow = { isGroup: false; parentGroupInfo?: ParentGroupInfo } & Row;
export type GroupRow = {
  isGroup: true;
  componentKind: string;
  childrens: ActivityRow[];
} & Row;

export type Activity = ActivityRow | GroupRow;

export type IotTemplate = {
  id: string;
  planId: string;
  eduGridElementId: string;
  spaceId: string;
  title: string;
  rows: IotTemplateRow[];
};

export type IotTemplateRow = {
  id: string;
  path: string;
};
export type GetActivityListParams = Pick<IotTemplate, 'eduGridElementId' | 'planId'>;
