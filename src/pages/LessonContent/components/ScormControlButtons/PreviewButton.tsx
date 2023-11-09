import { $scormPeviewIsActive, setScormPeviewIsActiveValue } from '@src/pages/LessonContent/model';
import { useStore } from 'effector-react';
import { Button } from '@kit-edu/button';
import { useCallback, useEffect } from 'react';

export const PreviewButton = (): JSX.Element => {
  const scormPreviewIsActive = useStore($scormPeviewIsActive);
  useEffect(() => {
    return () => {
      setScormPeviewIsActiveValue(false);
    };
  }, []);
  const previewClickHandler = useCallback(() => {
    setScormPeviewIsActiveValue(!scormPreviewIsActive);
  }, [scormPreviewIsActive]);
  return (
    <Button size="medium" onClick={previewClickHandler}>
      Просмотреть
    </Button>
  );
};
