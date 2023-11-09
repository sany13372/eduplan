import { $linkedStudentsFioFilter, resetDomain, setLinkedStudentsFioFilter } from '@src/pages/LessonSettings/model';

$linkedStudentsFioFilter.on(setLinkedStudentsFioFilter, (_, val) => val).reset(resetDomain);
