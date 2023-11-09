import { connectGetActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { resetDomainData, totalTeacherCount } from '@src/pages/Teachers/model';
import { getSpaceIdByEduplanIdQuery, getTotalTeacherCountQuery } from '@src/pages/Teachers/model/init/queries';

connectGetActionNodes({
  nodes: totalTeacherCount,
  handler: async (eduplanId: string) => {
    const spaceId = await resolved(() => getSpaceIdByEduplanIdQuery(eduplanId), { noCache: true });
    return resolved(() => getTotalTeacherCountQuery(spaceId), { noCache: true });
  },
  resetOn: [resetDomainData],
});
