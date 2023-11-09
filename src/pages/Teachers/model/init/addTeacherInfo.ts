import {
  $addTeacherDrawerInfo,
  resetAddTeacherDrawerInfo,
  resetDomainData,
  setAddTeacherDrawerInfo,
} from '@src/pages/Teachers/model';

$addTeacherDrawerInfo
  .on(setAddTeacherDrawerInfo, (_, value) => value)
  .reset([resetAddTeacherDrawerInfo, resetDomainData]);
