import React from 'react';
import { AbilityContext, CarErrorStub } from '@sber-universe/om-component-library';
import { ability as defaultAbility } from '@sber-universe/om-component-library/dist/Can/config';
import { EduPlansListAdmin } from '@src/pages/EduPlansList/EduPlanListAdmin';
import { EduPlansListPerson } from '@src/pages/EduPlansList/EduPlanListPerson';
import { useAbility } from '@utils/hooks';

import './model/init';

const EduPlansListDefaultContent = ({ eduProgramId }: EduPlansListDefaultProps): JSX.Element => {
  const ability = useAbility();
  // @ts-ignore
  const hasAdminAccess = ability.can('manage', 'EduPlan');
  // @ts-ignore
  const hasPersonAccess = ability.can('manage', 'EduPlanManagement');

  return (
    <>
      {hasAdminAccess && <EduPlansListAdmin eduProgramId={eduProgramId} />}
      {hasPersonAccess && !hasAdminAccess && <EduPlansListPerson />}
      {!hasPersonAccess && !hasAdminAccess && (
        <CarErrorStub size="large" titleParams="У вас нет доступа к данному разделу " />
      )}
    </>
  );
};

export type EduPlansListDefaultProps = {
  eduProgramId?: string;
};

export const EduPlansListDefault = ({ eduProgramId }: EduPlansListDefaultProps): JSX.Element => {
  return (
    <AbilityContext.Provider value={defaultAbility}>
      <EduPlansListDefaultContent eduProgramId={eduProgramId} />
    </AbilityContext.Provider>
  );
};
