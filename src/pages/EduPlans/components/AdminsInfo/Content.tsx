import { useStore } from 'effector-react';
import { admins, availableToLinkAdminsCount } from '@src/pages/EduPlans/model';
import { useMemo } from 'react';
import { ExternalRoutes, getExtenalPath } from '@constants/routes';
import { defaultAdmin } from '@src/pages/EduPlans/model/constants';
import { RowListSkeleton, SolidNotification } from '@src/components';
import { Typography } from '@kit-edu/typography';

type ContentProps = {
  spaceId: string;
};

type EmptyListNotificationProps = Pick<ContentProps, 'spaceId'>;

const EmptyListNotification = ({ spaceId }: EmptyListNotificationProps) => {
  const staffLink = useMemo(() => getExtenalPath(ExternalRoutes.STAFF_LIST, { ':id': spaceId }), [spaceId]);

  return (
    <SolidNotification
      variant="embedded"
      template="Сначала настройте роли в разделе %a"
      links={[{ to: staffLink, label: '«Сотрудники»', target: '_blank' }]}
    />
  );
};

export const Content = ({ spaceId }: ContentProps) => {
  const availableToLinkCount = useStore(availableToLinkAdminsCount.$value);
  const availableToLinkCountStatus = useStore(availableToLinkAdminsCount.$status);
  const adminsList = useStore(admins.$value);
  const adminsListStatus = useStore(admins.$status);
  const isNotDone = adminsListStatus !== 'done' || !['done', 'fail'].includes(availableToLinkCountStatus);

  const adminsListStr = useMemo(
    () => (adminsList.length === 0 ? defaultAdmin : adminsList.map((e) => e.caption).join(', ')),
    [adminsList],
  );

  if (isNotDone) return <RowListSkeleton commonClassName="!h-5" />;

  return (
    <>
      {adminsList.length === 0 && availableToLinkCount === 0 ? (
        <EmptyListNotification spaceId={spaceId} />
      ) : (
        <Typography as="h4" fontWeight="semibold" size="16px" className="text-left">
          {adminsListStr}
        </Typography>
      )}
    </>
  );
};
