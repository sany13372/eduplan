import { $unlinkedStudentsFioFilter, resetDomain, setUnlinkedStudentsFioFilter } from '@src/pages/LessonSettings/model';

$unlinkedStudentsFioFilter.on(setUnlinkedStudentsFioFilter, (_, val) => val).reset(resetDomain);
