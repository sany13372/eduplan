import { Icon, IconColorType } from '@pcbl-ui-v4/icon';

type InfoPanelProps = {
  variant?: Theme;
  bordered?: boolean;
  message: string;
};
type Theme = 'primary' | 'positive';
type ThemeDesc = {
  wrapperBorder: string;
  icon: IconColorType;
  content: string;
};
type ThemeData = {
  [x in Theme]: ThemeDesc;
};
const infoPanelThemes: ThemeData = {
  positive: {
    icon: 'text-positive',
    content: '',
    wrapperBorder: '',
  },
  primary: {
    icon: 'text-informative',
    content: 'text-informative',
    wrapperBorder: 'border-primary  border-dashed border-m  rounded-m',
  },
};
export const InfoPanel = ({ variant = 'primary', bordered = true, message }: InfoPanelProps): JSX.Element => {
  return (
    <div className={`flex p-1 items-center  space-x-1 ${bordered ? infoPanelThemes[variant].wrapperBorder : ''}`}>
      <Icon name="warning-info-solid" size={24} color={infoPanelThemes[variant].icon} className="flex-shrink-0" />
      <p className={`break-words ${infoPanelThemes[variant].content}`}>{message}</p>
    </div>
  );
};
