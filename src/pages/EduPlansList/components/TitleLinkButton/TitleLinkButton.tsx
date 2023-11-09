import { EduPlanShortInfo } from '@src/pages/EduPlansList/model/types';
import { Link, useParams } from 'react-router-dom';
import { DefaultParams } from '@src/types';
import { getPath, MfeRoutes } from '@constants/routes';
import React from 'react';

type TitleLinkButtonProps = { item: EduPlanShortInfo };
export const TitleLinkButton = ({ item }: TitleLinkButtonProps) => {
  const { id } = useParams<DefaultParams>();
  return (
    <Link to={getPath(MfeRoutes.EDU_PLAN_INFO_VIEW, { ':id': id, ':planId': item.id })} className="truncate block">
      {item.title}
    </Link>
  );
};
