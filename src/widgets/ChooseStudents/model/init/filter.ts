import { $filter, resetDomain, setFilter } from '@src/widgets/ChooseStudents/model';

$filter.on(setFilter, (_, val) => val).reset(resetDomain);
