import { Button } from '@kit-edu/button';
import { $toggleStreamIsPublStatus, toggleStreamIsPubl } from '@src/pages/LessonSettings/model';
import React from 'react';
import { Stream } from '@src/pages/LessonSettings/model/types';
import { useStore } from 'effector-react';

type ToggleIsPublButtonProps = {
  stream: Stream;
};
export const ToggleIsPublButton = ({ stream }: ToggleIsPublButtonProps) => {
  const toggleIsPublStatus = useStore($toggleStreamIsPublStatus);
  const isPending = toggleIsPublStatus === 'pending';

  const clickHandler = () => {
    toggleStreamIsPubl(stream);
  };

  const label = stream.isPublic ? 'Остановить поток' : 'Запустить поток';
  return (
    <Button size="medium" loading={isPending} onClick={clickHandler}>
      {label}
    </Button>
  );
};
