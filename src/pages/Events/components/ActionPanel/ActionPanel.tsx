import { LinkButton } from '@kit-edu/button';
import { getPath, MfeRoutes } from '@constants/routes';
import { KindFilter } from '@src/pages/Events/components/ActionPanel/KindFilter';
import { DateFilter } from '@src/pages/Events/components/ActionPanel/DateFilter';
import { useStore } from 'effector-react';
import { $filters } from '@src/pages/Events/model';
import { useParams } from 'react-router-dom';
import { EduPlanParams } from '@src/types';
import { useMediaQuery } from '@sber-universe/om-component-library';

export const ActionPanel = () => {
  const { tabs, kinds, participantId } = useStore($filters);
  const { planId } = useParams<EduPlanParams>();
  const isOnlyView = Boolean(participantId);
  const isMobile = useMediaQuery({ breakpoint: 'md', type: 'down' });

  return (
    <div className="flex space-x-8 justify-between items-center -mt-px py-2 md:py-4">
      <div className="space-x-8 flex items-center">
        {!isMobile && <KindFilter kinds={kinds} />}
        <DateFilter tabs={tabs} />
      </div>
      {!isOnlyView && (
        <LinkButton
          appearance="black"
          iconRightName="master-plus"
          size="large"
          to={getPath(MfeRoutes.EVENT_CREATE, {}, { owner: planId })}
        >
          Добавить
        </LinkButton>
      )}
    </div>
  );
};
