/* eslint-disable react/button-has-type */
import { ContentPanel } from '@sber-universe/om-component-library';
import * as React from 'react';
import { Typography } from '@kit-edu/typography';
import classnames from 'classnames';
import { useState } from 'react';
import { Icon, IconProps } from '@kit-edu/icon';

type CollapseDescButtonProps = { isCollapsed: boolean; clickHandler: () => void };
const CollapseDescButton = ({ isCollapsed, clickHandler }: CollapseDescButtonProps) => {
  const iconName: IconProps['iconName'] = !isCollapsed ? 'master-chevron-up' : 'master-chevron-down';
  const buttonText = !isCollapsed ? 'Скрыть часть описания' : 'Показать описание полностью';

  return (
    <button className="flex gap-[10px] items-center" onClick={clickHandler}>
      <Typography as="span" size="14px" color="medium">
        {buttonText}
      </Typography>
      <Icon size="14" iconName={iconName} className="text-[#52525b] " />
    </button>
  );
};
type DescriptionPanelProps = {
  description: string;
  Logo: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
  classname?: string;
  dataTestId: string;
};
export const DescriptionPanel = ({ description, Logo, classname = '', dataTestId }: DescriptionPanelProps) => {
  const [showFullDesc, setShowFullDesc] = useState<boolean>(false);
  const toggleShowFullDesc = () => setShowFullDesc((val) => !val);

  const collapseDescIsAvailable = description.length >= 650;
  const renderedDescription =
    collapseDescIsAvailable && !showFullDesc ? `${description.slice(0, 650)}...` : description;
  return (
    <ContentPanel
      className={classnames('p-6 flex flex-col-reverse md:flex-row gap-4', classname)}
      data-testid={dataTestId}
    >
      <div className="space-y-[30px] grow-0 w-full">
        <Typography as="p" color="dark">
          {renderedDescription}
        </Typography>
        <CollapseDescButton isCollapsed={!showFullDesc} clickHandler={toggleShowFullDesc} />
      </div>
      <Logo className="shrink-0 w-[180px] h-[180px] rounded-md " />
    </ContentPanel>
  );
};
