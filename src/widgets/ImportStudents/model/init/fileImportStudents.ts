import { $fileImportStudents, resetDomain, setFileImportStudents } from '@src/widgets/ImportStudents/model';

$fileImportStudents.on(setFileImportStudents, (st, val) => val).reset(resetDomain);
