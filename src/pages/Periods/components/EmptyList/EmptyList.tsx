import { InfoWrapper } from '@sber-universe/om-component-library/dist/Info/InfoWrapper';
import { ReactComponent as EmptyImg } from '@src/assets/images/participants.svg';

export const EmptyList = () => {
  return (
    <InfoWrapper
      title="Для части плана обучения не добавлены периоды"
      subTitle="Чтобы создать период, нажмите на кнопку «Добавить»"
    >
      <EmptyImg />
    </InfoWrapper>
  );
};
