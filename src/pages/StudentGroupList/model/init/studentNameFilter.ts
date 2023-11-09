import { $studentNameFilter, resetStudentNameFilter, setStudentNameFilter } from '@src/pages/StudentGroupList/model';

$studentNameFilter.on(setStudentNameFilter, (_, name) => name).reset(resetStudentNameFilter);
