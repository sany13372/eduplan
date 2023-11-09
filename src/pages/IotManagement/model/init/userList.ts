import { $userList, setUserList } from '@src/pages/IotManagement/model';

$userList.on(setUserList, (state, val) => [...state, ...val]);
