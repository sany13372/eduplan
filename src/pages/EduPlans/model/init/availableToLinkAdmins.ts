import { connectGetActionNodes } from '@utils/effector';
import { resetDomain } from '@src/pages/LessonSettings/model';
import { resolved } from '@src/gql-client';
import { initialAvailableToLinkAdmins, availableToLinkAdmins } from '@src/pages/EduPlans/model';
import { GetUsersDataParams, UsersData } from '@src/pages/EduPlans/model/types';
import { getAvailableToLinkUsersQuery } from '@src/pages/EduPlans/model/init/queries';

connectGetActionNodes<GetUsersDataParams, UsersData>({
  nodes: initialAvailableToLinkAdmins,
  handler: async (params) => resolved(() => getAvailableToLinkUsersQuery(params), { noCache: true }),
  resetOn: [resetDomain],
});

availableToLinkAdmins.$value.on(initialAvailableToLinkAdmins.getFx.doneData, (_, resp) => resp);
connectGetActionNodes<GetUsersDataParams, UsersData>({
  nodes: availableToLinkAdmins,
  handler: async (params) => resolved(() => getAvailableToLinkUsersQuery(params), { noCache: true }),
  resetOn: [resetDomain],
});
