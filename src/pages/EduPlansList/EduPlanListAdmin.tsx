import { DeleteEduPlanConfirmDialog, EduPlanListTable } from '@src/pages/EduPlansList/components';
import { getPath, MfeRoutes } from '@constants/routes';
import React, { useEffect } from 'react';
import {
  $eduStartDateListStatus,
  $enrollmentYearListStatus,
  getCompetitionPeriodList,
  getEduFormList,
  getEduStartDateList,
  getEduTechnologyList,
  getEnrollmentYearList,
  $competitionPeriodListStatus,
  $eduFormListStatus,
  $eduTechnologyListStatus,
} from '@src/pages/EduPlansList/model';
import { useStore } from 'effector-react';
import { setPrevIsExternal } from '@src/app/model';
import { Typography } from '@kit-edu/typography';
import { LinkButton } from '@kit-edu/button';
import { LoadingWrapper } from '@sber-universe/om-component-library';
import './model/init';

export type EduPlansListAdminProps = {
  eduProgramId?: string;
};
export const EduPlansListAdmin = ({ eduProgramId }: EduPlansListAdminProps): JSX.Element => {
  const enrollmentYearStatus = useStore($enrollmentYearListStatus);
  const eduStartDateStatus = useStore($eduStartDateListStatus);
  const eduTechnologyStatus = useStore($eduTechnologyListStatus);
  const eduFormStatus = useStore($eduFormListStatus);
  const competitionPeriodStatus = useStore($competitionPeriodListStatus);
  const statusList = [
    eduFormStatus,
    eduTechnologyStatus,
    competitionPeriodStatus,
    enrollmentYearStatus,
    eduStartDateStatus,
  ];

  useEffect(() => {
    setPrevIsExternal(Boolean(eduProgramId));
    getEduFormList(eduProgramId);
    getEduTechnologyList(eduProgramId);
    getCompetitionPeriodList(eduProgramId);
    getEnrollmentYearList(eduProgramId);
    getEduStartDateList(eduProgramId);
  }, [eduProgramId]);

  return (
    <>
      <DeleteEduPlanConfirmDialog />
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between space-x-2 pt-4 items-center">
          <Typography as="h2" size="32px" fontWeight="semibold">
            Планы обучения
          </Typography>
          {eduProgramId && (
            <LinkButton
              appearance="black"
              iconRightName="master-plus"
              size="medium"
              colorMode="onLight"
              to={getPath(MfeRoutes.EDU_PLAN_CREATE, { ':programId': eduProgramId })}
            >
              Добавить
            </LinkButton>
          )}
        </div>

        <div>
          <LoadingWrapper loadingStatusList={statusList}>
            <EduPlanListTable eduProgId={eduProgramId} />
          </LoadingWrapper>
        </div>
      </div>
    </>
  );
};
