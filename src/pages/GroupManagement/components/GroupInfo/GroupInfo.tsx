import React, { FC } from 'react';
import { ViewGroupInfo } from '@src/pages/GroupManagement/model/types';
import format from 'date-fns/format';

import { InfoCard } from './InfoCard';

interface GroupInfoProps {
  groupData: ViewGroupInfo;
}

export const GroupInfo: FC<GroupInfoProps> = ({ groupData }) => {
  return (
    <div className="mb-[1.75rem]">
      <div className="flex flex-wrap gap-2">
        <InfoCard
          width="1/2"
          title="Образовательная программа"
          subtitle={groupData.eduProgramTitle}
          iconName="master-education-graduation"
        />
        <InfoCard width="1/2" title="План обучения" subtitle={groupData.eduPlanTitle} iconName="master-file-text" />
        <InfoCard width="1/5" title="Тип группы" subtitle={groupData.groupTypeTitle} />
        <InfoCard width="1/5" title="Форма обучения" subtitle={groupData.eduFormTitle} />
        <InfoCard width="1/5" title="Срок освоения" subtitle={groupData.completitionPeriodTitle} />
        <InfoCard width="1/5" title="Год набора" subtitle={String(groupData.enrollmentYear || '')} />
        {groupData.eduStartDate && (
          <InfoCard width="1/5" title="Дата начала обучения" subtitle={format(groupData.eduStartDate, 'dd.MM.yyyy')} />
        )}
      </div>
    </div>
  );
};
