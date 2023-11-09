import { EduPlanInfo } from '@src/pages/EduPlans/model/types';
import { localDateToPrettyString } from '@utils/date';
import classnames from 'classnames';
import { ReactComponent as PlanLogo } from '@src/assets/images/logo.svg';
import { useMemo } from 'react';
import { ExternalRoutes, getExtenalPath } from '@constants/routes';
import { AdminsInfo, LinkCard } from '@src/pages/EduPlans/components';

import styles from './InfoPanel.module.css';
import { DescriptionPanel, SubInfoPanel } from './components';

export const InfoPanel = ({ data }: { data: EduPlanInfo }) => {
  const spaceInfoLink = useMemo(() => getExtenalPath(ExternalRoutes.SPACE_INFO, { ':id': data.spaceInfo.id }), [data]);
  const eduProgInfoLink = useMemo(
    () => getExtenalPath(ExternalRoutes.EDUPROG_INFO, { ':id': data.eduProgramInfo.id }),
    [data],
  );

  return (
    <>
      <div className="flex gap-4">
        <div
          className={classnames({
            [styles.infoPanel]: true,
          })}
        >
          <LinkCard
            key="space"
            to={spaceInfoLink}
            containerClassName={styles.infoPanelLink}
            title={data.spaceInfo.title}
            iconName="master-education-graduation"
            label="Образовательное пространство"
            dataTestId="spaceInfoCard"
          />
          <LinkCard
            key="eduprog"
            to={eduProgInfoLink}
            containerClassName={styles.infoPanelLink}
            title={data.eduProgramInfo.title}
            iconName="master-file-text"
            label="Образовательная программа"
            dataTestId="eduProgInfoCard"
          />
          <AdminsInfo planId={data.id} spaceId={data.spaceInfo.id} className={styles.infoPanelAdmins} />

          <SubInfoPanel
            className={styles.infoPanelSubInfo}
            subTitle="Форма обучения"
            title={data.eduForm.shortTitle}
            dataTestId="eduFormCard"
          />
          <SubInfoPanel
            className={styles.infoPanelSubInfo}
            subTitle="Технология обучения"
            title={data.eduTechnology.shortTitle}
            dataTestId="eduTechnologyCard"
          />
          <SubInfoPanel
            className={styles.infoPanelSubInfo}
            subTitle="Срок освоения"
            title={data.competitionPeriod.caption}
            dataTestId="compPeriodCard"
          />
          {data.enrollmentYear && (
            <SubInfoPanel
              className={styles.infoPanelSubInfo}
              subTitle="Год набора"
              title={data.enrollmentYear.toString()}
              dataTestId="enrollmentYearCard"
            />
          )}
          {data.eduStartDate && (
            <SubInfoPanel
              className={styles.infoPanelSubInfo}
              subTitle="Дата начала обучения"
              title={localDateToPrettyString(data.eduStartDate)}
              dataTestId="eduStartDateCard"
            />
          )}
          {data.description && (
            <DescriptionPanel
              classname={styles.infoPanelDesc}
              description={data.description}
              Logo={PlanLogo}
              dataTestId="planDescriptionCard"
            />
          )}
        </div>
        {!data.description && <PlanLogo className={styles.infoPanelLogo} data-testid="standaloneLogo" />}
      </div>
      {/* {adminsPermissions.isEditable && ( */}
      {/*  <Portal portalId={PORTAL_ID}> */}
      {/*    <Drawer onClose={() => {}} isOpen> */}
      {/*      dsf */}
      {/*    </Drawer> */}
      {/*  </Portal> */}
      {/* )} */}
    </>
  );
};
