import { Button } from '@kit-edu/button';
import { Hint } from '@kit-edu/tooltip/build/presets';
import { Lesson, Stream } from '@src/pages/LessonSettings/model/types';
import { availableToLinkTeachersCount, setDrawerInfo } from '@src/pages/LessonSettings/model';
import { useStore } from 'effector-react';
import { useMemo } from 'react';

type LinkTeacherButtonProps = {
  stream: Stream;
  lesson: Lesson | null;
};
export const LinkTeacherButton = ({ stream, lesson }: LinkTeacherButtonProps) => {
  const availableCount = useStore(availableToLinkTeachersCount.$value);
  const title = useMemo(
    () => (lesson?.lessonKind.systemCode === 'homework' ? 'в качестве проверяющих' : 'на поток'),
    [lesson],
  );
  const onClick = () => {
    setDrawerInfo({ type: 'LINK_TEACHERS', val: stream });
  };
  return (
    <Hint
      text={`Вы уже назначили всех преподавателей мероприятия ${title}`}
      disabled={!!availableCount}
      placement="left"
      maxWidth={200}
    >
      <Button appearance="black" onClick={onClick} disabled={!availableCount}>
        Добавить
      </Button>
    </Hint>
  );
};
