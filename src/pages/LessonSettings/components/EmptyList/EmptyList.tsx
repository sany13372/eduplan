import { InfoWrapper } from '@sber-universe/om-component-library';
import { ReactComponent as NoLessonsImage } from '@src/assets/images/participants.svg';

type EmptyListProps = {
  title: string;
  subTitle?: string;
};

const defaultSubTitle = 'Чтобы составить список обучающихся потока, нажмите на кнопку «Добавить»';
export const EmptyList = ({ title, subTitle = defaultSubTitle }: EmptyListProps) => {
  return (
    <InfoWrapper
      size="large"
      title={title}
      subTitle={subTitle}
      titleClassName="md:max-w-[400px]"
      subTitleClassName="md:max-w-[400px]"
    >
      <NoLessonsImage />
    </InfoWrapper>
  );
};
