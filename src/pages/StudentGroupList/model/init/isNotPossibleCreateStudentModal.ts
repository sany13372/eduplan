import {
  $isNotPossibleCreateStudentModal,
  resetDomain,
  setIsNotPossibleCreateStudentModal,
} from '@src/pages/StudentGroupList/model';

$isNotPossibleCreateStudentModal.on(setIsNotPossibleCreateStudentModal, (state, val) => val).reset(resetDomain);
