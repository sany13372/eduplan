import { connectConfirmNodes } from '@utils/effector';
import { closeConfirm, resetDomain } from '@src/widgets/ChooseStudents/model';

connectConfirmNodes({
  nodes: closeConfirm,
  resetOn: [resetDomain],
});
