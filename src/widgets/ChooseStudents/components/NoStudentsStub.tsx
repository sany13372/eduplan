import { InfoWrapper } from '@sber-universe/om-component-library/dist/Info/InfoWrapper';
import { ReactComponent as NoStudentsImage } from '@src/assets/images/filters.svg';

export const NoStudentsStub = () => (
  <InfoWrapper title="Такие обучающиеся не найдены" subTitle="Измените параметры поиска и повторите попытку">
    <NoStudentsImage />
  </InfoWrapper>
);
