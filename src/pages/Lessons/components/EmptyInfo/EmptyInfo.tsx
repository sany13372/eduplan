import { InfoWrapper } from '@sber-universe/om-component-library/dist/Info/InfoWrapper';
import { ReactComponent as EmptyParticipantListImage } from '@src/assets/images/participants.svg';

export const EmptyInfo = () => {
  return (
    <InfoWrapper
      title="Создание занятий невозможно"
      subTitle="Для создания занятия сначала добавьте тему во вкладке «Структура и темы»"
      size="large"
    >
      <EmptyParticipantListImage />
    </InfoWrapper>
  );
};
