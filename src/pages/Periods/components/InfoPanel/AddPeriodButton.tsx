import { Button } from '@kit-edu/button';
import { setActionStoreValue } from '@src/pages/Periods/model';

export const AddPeriodButton = () => {
  const clickHandler = () => {
    setActionStoreValue({ action: 'ADD' });
  };
  return (
    <Button appearance="black" size="medium" onClick={clickHandler}>
      Добавить
    </Button>
  );
};
