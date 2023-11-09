import { IconProps } from '@kit-edu/icon';
import { useEffect } from 'react';
import { admins, availableToLinkAdminsCount, setAdminsDrawerVisibility } from '@src/pages/EduPlans/model';
import { useAdminsPermissions } from '@src/pages/EduPlans/model/hooks';
import { ActionCard, MainCard } from '@src/pages/EduPlans/components';
import { useStore } from 'effector-react';

import { Content } from './Content';

type AdminsInfoProps = {
  planId: string;
  spaceId: string;
  className?: string;
};

export const AdminsInfo = ({ planId, spaceId, className = '' }: AdminsInfoProps) => {
  const { isVisible, isEditable } = useAdminsPermissions();
  const availableToLinkCount = useStore(availableToLinkAdminsCount.$value);
  useEffect(() => {
    if (isVisible && planId) {
      admins.get(planId);
      availableToLinkAdminsCount.get(planId);
    }
    return () => {
      admins.reset();
      availableToLinkAdminsCount.reset();
      setAdminsDrawerVisibility(false);
    };
  }, [isVisible, planId, isEditable]);
  if (!isVisible) return null;
  const label = 'Администратор плана';
  const dataTestId = 'eduplan-admin';
  const iconName: IconProps['iconName'] = 'master-user';
  const onOpenDrawerClick = () => setAdminsDrawerVisibility(true);
  return (
    <>
      {isEditable && availableToLinkCount > 0 ? (
        <ActionCard
          iconName={iconName}
          label={label}
          dataTestId={dataTestId}
          onClick={onOpenDrawerClick}
          containerClassName={className}
        >
          <Content spaceId={spaceId} />
        </ActionCard>
      ) : (
        <MainCard iconName={iconName} label={label} dataTestId={dataTestId} className={className}>
          <Content spaceId={spaceId} />
        </MainCard>
      )}
    </>
  );
};
