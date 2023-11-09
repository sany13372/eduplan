import { EduPlanParams, getPath, MfeRoutes } from '@constants/routes';
import { CellProps, Column, GenericTable } from '@sber-universe/om-component-library';
import { useStore } from 'effector-react';
import React, { useCallback } from 'react';
import { ErrorMessage } from '@src/components';
import { Link, useHistory, useParams } from 'react-router-dom';
import { $getGroupListStatus, $groupListInfo, deleteGroup, getGroupList } from '@src/pages/GroupList/model';
import { defaultEduGroupListState } from '@src/pages/GroupList/model/constants';
import { EduGroupListState, GroupInfo } from '@src/pages/GroupList/model/types';
import { Typography } from '@kit-edu/typography';

import '@src/pages/GroupList/model/init';

type TitleLinkButtonProps = { item: GroupInfo };
const TitleLinkButton = ({ item }: TitleLinkButtonProps) => {
  const { planId } = useParams<EduPlanParams>();
  return (
    <Link
      to={getPath(MfeRoutes.EDU_PLAN_INFO_GROUP_VIEW, { ':planId': planId, ':groupId': item.id })}
      className="truncate justify-start"
    >
      <Typography as="span" size="14px">
        {item.title}
      </Typography>
    </Link>
  );
};
const columns: Column<GroupInfo>[] = [
  {
    Header: 'Название',
    accessor: 'title',
    width: '95%',
    disableFilters: true,
    disableSortBy: true,
    Cell: ({ row }: CellProps<GroupInfo>) => {
      return <TitleLinkButton item={row.original} />;
    },
  },
];

export const EduGroupListTable = (): JSX.Element => {
  const { planId } = useParams<EduPlanParams>();
  const history = useHistory();
  const { totalItemCount, items } = useStore($groupListInfo);
  const status = useStore($getGroupListStatus);
  const isFail = status === 'fail';
  const isLoading = status === 'pending';
  const getData = useCallback((val: EduGroupListState) => getGroupList({ eduPlanId: planId, state: val }), [planId]);

  if (isFail) return <ErrorMessage />;
  const onDelete = (item: GroupInfo) => {
    deleteGroup.setItem(item);
  };

  const onEdit = (item: GroupInfo) => {
    history.push(getPath(MfeRoutes.EDU_PLAN_INFO_GROUP_EDIT, { ':groupId': item.id, ':planId': planId }));
  };
  return (
    <>
      <GenericTable<GroupInfo, never>
        columns={columns}
        data={items}
        itemsCount={totalItemCount}
        getData={getData}
        BlankSlate="Для плана обучения не добавлены учебные группы"
        // @ts-ignore
        initialState={defaultEduGroupListState}
        loading={isLoading}
        manualPagination
        manualGlobalFilter
        manualFilters
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};
