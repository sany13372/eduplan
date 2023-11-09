import { SemesterInfo } from '@src/pages/Teachers/model/types';
import { CollapsedPanel } from '@src/pages/Teachers/components/SemesterInfo/CollapsedPanel';
import { useState, useMemo } from 'react';
import { InfoMessage } from '@src/components';
import { ActivityInfo } from '@src/pages/Teachers/components';

type SemesterInfoPanelProps = {
  data: SemesterInfo;
  path: string;
};

export const SemesterInfoPanel = ({ data, path }: SemesterInfoPanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onCollapseClick = () => {
    setIsCollapsed((val) => !val);
  };

  const isDisabled = useMemo(() => data.activityList.length === 0, [data]);

  const renderLeft = () => (
    <InfoMessage
      message="Настройка списка преподавателей невозможна"
      description="Для части срока освоения не добавлено ни одного мероприятия"
    />
  );

  return (
    <CollapsedPanel
      id={data.id}
      title={data.name}
      isCollapsed={isCollapsed}
      isTransparent
      onClickCollapseButton={onCollapseClick}
      disabled={isDisabled}
      renderLeftSideInfo={isDisabled ? renderLeft : undefined}
    >
      <div className="flex flex-col  space-y-4">
        {data.activityList.map((e) => (
          <ActivityInfo data={e} key={e.id} path={`${path}.${e.id}`} />
        ))}
      </div>
    </CollapsedPanel>
  );
};
