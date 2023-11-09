import { $adminsDrawerIsVisible, linkAdmins, setAdminsDrawerVisibility } from '@src/pages/EduPlans/model';
import { sample } from 'effector';

$adminsDrawerIsVisible.on(setAdminsDrawerVisibility, (_, val) => val);

sample({
  clock: linkAdmins.addFx.done,
  fn: () => false,
  target: setAdminsDrawerVisibility,
});
