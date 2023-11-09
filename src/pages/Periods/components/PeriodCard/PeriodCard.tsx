import { ContentPanel } from '@sber-universe/om-component-library';
import { Typography } from '@kit-edu/typography';
import { TextGroup } from '@src/components';
import { Period } from '@src/pages/Periods/model/types';
import { PeriodCardMenu } from '@src/pages/Periods/components/PeriodCard/PeriodCardMenu';

type PeriodCardProps = {
  item: Period;
};

export const PeriodCard = ({ item }: PeriodCardProps) => {
  const {
    title,
    periodKind: { caption: periodKindTitle },
    dates: { start: startDate, end: endDate },
  } = item;
  return (
    <ContentPanel className="p-6 space-y-4" data-testid="periodBlock">
      <div className="flex items-center justify-between space-x-8">
        <Typography as="h4" size="16px" fontWeight="semibold">
          {title}
        </Typography>
        <PeriodCardMenu period={item} />
      </div>
      <div className="grid grid-cols-2 space-x-2">
        <div className="p-4 bg-base-100 rounded-[8px] flex items-center" data-testid="periodKind">
          <TextGroup secondaryText="Вид" mainText={periodKindTitle} />
        </div>

        <div className="p-4 bg-base-100 rounded-[8px] flex items-center space-x-8" data-testid="periodDate">
          <TextGroup secondaryText="Начало" mainText={startDate.toLocaleDateString('ru')} />
          <TextGroup secondaryText="Окончание" mainText={endDate.toLocaleDateString('ru')} />
        </div>
      </div>
    </ContentPanel>
  );
};
