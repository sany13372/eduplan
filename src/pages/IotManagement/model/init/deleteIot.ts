import { connectDeleteActionNodes } from '@utils/effector';
import { convertRemoveError } from '@src/pages/IotManagement/model/validation';
import { deleteTrajectory } from '@src/pages/IotManagement/model';
import { TrajectoryData } from '@src/pages/IotManagement/model/types';
import { resolved } from '@src/gql-client';
import { deleteIotMutation } from '@src/pages/IotManagement/model/init/queries';

connectDeleteActionNodes<TrajectoryData>({
  nodes: deleteTrajectory,
  handler: async (params) => {
    const resp = await resolved(() => deleteIotMutation(params.id), { noCache: true });
    if (!resp) throw new Error('Не удалось удалить траекторию');
    return resp;
  },
  convertErrors: convertRemoveError,
});
