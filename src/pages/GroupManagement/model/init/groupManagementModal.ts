import { forward } from 'effector';
import {
  createStudentInfo,
  eduGroupInfo,
  groupManagementModalApi,
  updateGroup,
} from '@src/pages/GroupManagement/model';

forward({
  from: [eduGroupInfo.getFx.doneData],
  to: groupManagementModalApi.close,
});

forward({
  from: groupManagementModalApi.close,
  to: [updateGroup.reset, createStudentInfo.reset],
});
