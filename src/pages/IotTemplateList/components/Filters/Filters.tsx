import { Button } from '@kit-edu/button';
import { resetFilter } from '@src/pages/IotTemplateList/model';
import { TitleFilter } from '@src/pages/IotTemplateList/components/Filters/TitleFilter';
import { ComboBoxFilter } from '@src/pages/IotTemplateList/components/Filters/ComboBoxFilter';

export const Filters = (): JSX.Element => {
  const resetClickHandler = () => resetFilter();

  return (
    <div className="flex space-x-4 items-center">
      <TitleFilter />
      <ComboBoxFilter />
      <Button appearance="dark-outline" size="medium" onClick={resetClickHandler}>
        Сбросить
      </Button>
    </div>
  );
};
