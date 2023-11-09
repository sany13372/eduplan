import React, { useEffect } from 'react';
import { ViewActivityInfo } from '@src/pages/ActivityManagement/model/types';
import { DeleteRowConfirmDialog } from '@src/pages/ActivityManagement/components';
import { useStore } from 'effector-react';
import { deleteRow } from '@src/pages/ActivityManagement/model';
import { useHistory } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';

import { DeleteRowButton } from './DeleteRowButton';
import { UpdateButton } from './UpdateButton';

export type RenderTitle = (data: { title: string; content: React.ReactNode }) => React.ReactNode;

type HeaderProps = {
  activityData: ViewActivityInfo;
  planId: string;
  canEdit: boolean;
  renderTitle: RenderTitle;
};
export const Header = ({ activityData, planId, canEdit, renderTitle }: HeaderProps) => {
  const isDeleted = useStore(deleteRow.$isDeleted);
  const history = useHistory();
  useEffect(() => {
    if (isDeleted) history.push(getPath(MfeRoutes.EDU_PLAN_INFO_VIEW, { planId }));
  }, [history, isDeleted, planId]);

  return (
    <>
      {renderTitle({
        title: activityData.title,
        content: canEdit && (
          <div className="flex gap-4">
            <DeleteRowButton id={activityData.id ?? ''} />
            <UpdateButton planId={planId} planRowId={activityData.id ?? ''} />
          </div>
        ),
      })}
      <DeleteRowConfirmDialog planId={planId} />
    </>
  );
};
