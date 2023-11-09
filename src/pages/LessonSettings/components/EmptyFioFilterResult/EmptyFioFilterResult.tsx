import { InfoWrapper } from '@sber-universe/om-component-library';
import { ReactComponent as CatImage } from '@src/assets/images/filters.svg';

export const EmptyFioFilterResult = () => {
  return (
    <InfoWrapper
      size="small"
      title="Такие обучающиеся не найдены"
      subTitle="Измените параметры поиска и повторите попытку"
      subTitleClassName="md:max-w-[260px] mx-auto"
    >
      <CatImage />
    </InfoWrapper>
  );
};
