import { useStore } from 'effector-react';
import {
  $eduPlanGroups,
  $groupSelected,
  $studentNameFilter,
  groupStudentsMap,
} from '@src/pages/StudentGroupList/model';
import { useMemo } from 'react';
import { emptyGroupId, SelectBaseGroupItemEnum } from '@src/pages/StudentGroupList/model/constants';

import { StudentInfo } from './types';

export const useFilterByStudentName = (data: StudentInfo[]): StudentInfo[] => {
  const filterValue = useStore($studentNameFilter);
  const filteredData = useMemo(() => {
    const lowerCaseFilterValue = filterValue.toLowerCase();
    if (!lowerCaseFilterValue) return data;
    return data.filter((e) => e.fio.toLowerCase().includes(lowerCaseFilterValue));
  }, [data, filterValue]);
  return filteredData;
};

export const useHasStudents = () => {
  const data = useStore(groupStudentsMap.$value);
  return Object.values(data).findIndex((e) => e.students.length !== 0) !== -1;
};
export const useHasGroups = () => {
  const data = useStore(groupStudentsMap.$value);
  const groupIdList = Object.keys(data).filter((e) => e !== emptyGroupId);

  return Boolean(groupIdList.length);
};

export const useFilteredGroups = () => {
  const groups = useStore($eduPlanGroups);
  const selectedGroup = useStore($groupSelected);
  if (selectedGroup.id === SelectBaseGroupItemEnum.allGroups) return groups;
  return groups.filter((e) => e.id === selectedGroup.id);
};
