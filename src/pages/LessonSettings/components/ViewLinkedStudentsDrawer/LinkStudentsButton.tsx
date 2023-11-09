import { Button } from '@kit-edu/button';
import { Hint } from '@kit-edu/tooltip/build/presets';
import { Stream } from '@src/pages/LessonSettings/model/types';
import { availableToLinkStudentsCount, setDrawerInfo } from '@src/pages/LessonSettings/model';
import { useStore } from 'effector-react';

type LinkStudentsButtonProps = {
  stream: Stream;
};
export const LinkStudentsButton = ({ stream }: LinkStudentsButtonProps) => {
  const availableCount = useStore(availableToLinkStudentsCount.$value);
  const onClick = () => {
    setDrawerInfo({ type: 'LINK_STUDENTS', val: stream });
  };
  return (
    <Hint
      text="Вы уже распределили всех обучающихся плана по потокам занятия"
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
