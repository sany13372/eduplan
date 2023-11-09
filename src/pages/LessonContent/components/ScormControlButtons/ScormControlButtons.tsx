import { Button } from '@kit-edu/button';
import { Lesson } from '@src/pages/LessonContent/model/types';
import { useMemo } from 'react';

import { UploadScormButton } from './UploadScormButton';
import { PreviewButton } from './PreviewButton';
import { RemoveScorm } from './RemoveScorm';

type ScormControlButtonsProps = {
  lesson: Lesson;
};
export const ScormControlButtons = ({ lesson }: ScormControlButtonsProps): JSX.Element => {
  const { scormPackage, isAllowRegistration } = lesson;
  const hasContent = useMemo(() => !!scormPackage, [scormPackage]);

  return (
    <div className="space-x-4">
      {!hasContent && <UploadScormButton lesson={lesson} />}
      {hasContent && (
        <>
          <PreviewButton />
          <Button size="medium" disabled>
            Настроить
          </Button>
          <RemoveScorm scormId={scormPackage?.id ?? ''} isAllowRegistration={isAllowRegistration} />
        </>
      )}
    </div>
  );
};
