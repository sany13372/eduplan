import { $groupId, groupStudentModalApi, resetGroupId, setGroupId } from '@src/pages/StudentGroupList/model';
import { forward } from 'effector';

$groupId.on(setGroupId, (_, id) => id).reset(resetGroupId);

forward({
  from: groupStudentModalApi.close,
  to: resetGroupId,
});
