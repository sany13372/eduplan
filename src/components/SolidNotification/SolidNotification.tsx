import { Notification, NotificationProps } from '@sber-universe/om-component-library';
import { ReactComponent as SolidWarningIcon } from '@src/assets/icons/common/solid-warning.svg';

type SolidWarningNotificationProps = Pick<NotificationProps, 'links' | 'template' | 'variant' | 'appearance'>;

export const SolidNotification = ({
  template,
  links,
  variant,
  appearance = 'warning',
}: SolidWarningNotificationProps) => {
  return (
    <Notification icon={SolidWarningIcon} variant={variant} appearance={appearance} template={template} links={links} />
  );
};
