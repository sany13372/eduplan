import { Reference } from '@src/types';

export type EduGridElement = Reference & {
  priority?: number;
  planId: string;
  progId: string;
  spaceId: string;
};

export type IotTemplateData = {
  id: string;
  eduGridElementId: string;
  title: string;
  rows: IotTemplateRowData[];
};

export type IotTemplateRowData = Reference;

export type IotTemplateFilters = {
  title: string;
  gridElementList: Reference[];
};
