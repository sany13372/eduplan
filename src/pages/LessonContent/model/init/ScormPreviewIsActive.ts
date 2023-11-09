import { $scormPeviewIsActive, setScormPeviewIsActiveValue } from '@src/pages/LessonContent/model';

$scormPeviewIsActive.on(setScormPeviewIsActiveValue, (_, val) => val);
