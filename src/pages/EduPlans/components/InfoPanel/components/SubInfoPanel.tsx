import { ContentPanel } from '@sber-universe/om-component-library';
import { TextGroup } from '@src/components';
import classNames from 'classnames';

type SubInfoPanelProps = {
  className?: string;
  title: string;
  subTitle: string;
  dataTestId: string;
};
export const SubInfoPanel = ({ subTitle, title, className, dataTestId }: SubInfoPanelProps) => {
  return (
    <ContentPanel className={classNames('py-4.5 px-6', className)} data-testid={dataTestId}>
      <TextGroup mainText={title} secondaryText={subTitle} />
    </ContentPanel>
  );
};
