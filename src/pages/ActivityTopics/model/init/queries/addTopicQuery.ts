import { mutation } from '@src/gql-client';

import { RawEffort } from '../../types';

type DTO = {
  eduPlanRowId: string;
  title: string;
  shortTitle: string;
  description: string;
  parentId?: string;
  partTypeId: string;
  hoursData: RawEffort[];
};

export const addTopicQuery = (dto: DTO): string => {
  const { id } = mutation.addEditActivityPart({
    activityPartData: {
      eduPlanRowId: dto.eduPlanRowId,
      title: dto.title,
      parentId: dto.parentId,
      partTypeId: dto.partTypeId,
      hoursData: dto.hoursData,
    },
  });

  return id!;
};
