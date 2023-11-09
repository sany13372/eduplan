import { mutation } from '@src/gql-client';

type DTO = {
  eduPlanRowId: string;
  title: string;
  shortTitle: string;
  componentKindId: string;
  parentId?: string;
};

export const addTopicGroupQuery = (dto: DTO): string => {
  const data = mutation.addEditActivityPartGroup({ activityPartGroupData: dto });

  return data.id!;
};
