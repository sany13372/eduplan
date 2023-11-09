import React from 'react';
import { Desc } from '@src/pages/Desc/model/types';
import { FieldDesc } from '@src/pages/Desc/components/GroupInfo/FieldDesc';
import { ReactComponent as PriceIcon } from '@src/assets/icons/desc/priceIcon.svg';
import { ReactComponent as PriorityIcon } from '@src/assets/icons/desc/priorityIcon.svg';
import { DescWithDot } from '@src/pages/Desc/components/GroupInfo/DescWithDot';
import { StatusBadge } from '@src/pages/Desc/components/GroupInfo/StatusBadge';
import { UrlFieldDesc } from '@src/pages/Desc/components/GroupInfo/UrlFieldDesc';

type GroupInfoProps = {
  data: Desc;
};
export const GroupInfo = ({ data }: GroupInfoProps) => {
  return (
    <div className="flex flex-col space-y-[30px]" data-testid="descBlock">
      {data.description && <FieldDesc content={data.description} label="Описание" />}
      {data.target && <FieldDesc content={data.target} label="Целевая аудитория" />}
      {data.result && <FieldDesc content={data.result} label="Результаты обучения" />}
      {data.url && <UrlFieldDesc label="Адрес сайта" url={data.url} />}
      {data.landing && <UrlFieldDesc label="Лендинг" url={data.landing} />}

      {data.price && <DescWithDot desc="Стоимость" value={data.price} icon={<PriceIcon className="flex-shrink-0" />} />}
      {data.priority && (
        <DescWithDot desc="Приоритет" value={data.priority} icon={<PriorityIcon className="flex-shrink-0" />} />
      )}
      <StatusBadge value={data.isPubl} />
    </div>
  );
};
