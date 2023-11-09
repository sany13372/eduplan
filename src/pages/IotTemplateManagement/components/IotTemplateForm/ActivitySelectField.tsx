import { useStore } from 'effector-react';
import { activityStore } from '@src/pages/IotTemplateManagement/model';
import { CellProps, Column, SimpleTable } from '@sber-universe/om-component-library';
import React from 'react';
import { Activity, IotTemplate } from '@src/pages/IotTemplateManagement/model/types';
import { useFormikContext } from 'formik';
import { Typography } from '@kit-edu/typography';

import { TitleCell } from './TitleCell';
import { SwitchCell } from './SwitchCell';

const columns: Column<Activity>[] = [
  {
    Header: 'Мероприятие',
    id: 'title',
    minWidth: 700,
    width: 700,
    maxWidth: 700,
    Cell: ({ row }: CellProps<Activity>) => {
      return <TitleCell data={row.original} />;
    },
  },
  {
    Header: 'Включить в шаблон',
    id: 'includeActivity',
    minWidth: 90,
    width: 90,
    maxWidth: 90,
    Cell: ({ row }: CellProps<Activity>) => {
      // @ts-ignore
      return <SwitchCell data={row.original} />;
    },
  },
];
export const ActivitySelectField = (): JSX.Element => {
  const activitiList = useStore(activityStore.$value);
  const { errors } = useFormikContext<IotTemplate>();
  return (
    <div>
      <SimpleTable<Activity>
        columns={columns}
        data={activitiList}
        enableExpand
        enableIndexCol={false}
        allExpanded
        BlankSlate="В части срока освоения нет мероприятий. Добавьте мероприятие или группу мероприятий."
        getSubRows={(row: Activity) => (row.isGroup ? row.childrens : [])}
        getRowCustomClassList={() => ''}
        getFooterCustomClassList={() => ''}
      />
      {errors['rows'] && (
        <Typography size="14px" as="p" className="pt-4 text-right text-[#F43F5F]">
          {errors['rows']}
        </Typography>
      )}
    </div>
  );
};
