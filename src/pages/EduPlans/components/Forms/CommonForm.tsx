import React, { useEffect } from 'react';
import {
  $academicHourDurationListStatus,
  $competitionPeriodListStatus,
  $eduFormListStatus,
  $eduGridListStatus,
  $eduTechnologyListStatus,
  getAcademicHourDurationList,
  getCompetitionPeriodList,
  getEduFormList,
  getEduGridList,
  getEduTechnologyList,
} from '@src/pages/EduPlans/model';
import { useStore } from 'effector-react';
import { ErrorMessage } from '@src/components';
import { FormPrompt, LoadingOverlay, LoadingWrapper } from '@sber-universe/om-component-library';
import { Formik } from 'formik';
import { AddEduPlanInfo } from '@src/pages/EduPlans/model/types';
import { Event, Store } from 'effector';
import { EffectState } from 'patronum/status';
import { SchemaOf } from 'yup';
import { ValidationErrors } from '@utils/validation';
import { CommonFormContent } from '@src/pages/EduPlans/components/Forms/CommonFormContent';
import { Typography } from '@kit-edu/typography';

export type CommonFormProps<T extends AddEduPlanInfo> = {
  initDataStore: Store<T | null>;
  savedItemIdStore: Store<string>;
  initDataStatusStore: Store<EffectState>;
  title: string;
  validationSchema: SchemaOf<unknown>;
  onSubmit: (values: T) => void;
  onSuccess: (id: string) => void;
  onReset: () => void;
  errorStore: Store<ValidationErrors>;
  dismissErrorStore: Event<void>;
  notFoundError?: string;
};
export const CommonForm = <T extends AddEduPlanInfo>({
  title,
  initDataStore,
  initDataStatusStore,
  validationSchema,
  savedItemIdStore,
  onSubmit,
  onSuccess,
  onReset,
  errorStore,
  dismissErrorStore,
  notFoundError,
}: CommonFormProps<T>): JSX.Element => {
  const initData = useStore(initDataStore);
  const getInitDataStatus = useStore(initDataStatusStore);
  const eduGridListStatus = useStore($eduGridListStatus);
  const academicHourDurationStatus = useStore($academicHourDurationListStatus);
  const eduTechnologyStatus = useStore($eduTechnologyListStatus);
  const eduFormStatus = useStore($eduFormListStatus);
  const competitionPeriodStatus = useStore($competitionPeriodListStatus);
  const statusList = [
    eduGridListStatus,
    academicHourDurationStatus,
    getInitDataStatus,
    eduTechnologyStatus,
    eduFormStatus,
    competitionPeriodStatus,
  ];
  const errorStatusList = [getInitDataStatus];
  const savedItemId = useStore(savedItemIdStore);
  const programId = initData?.eduProgramInfo.id;

  useEffect(() => {
    if (programId) {
      getEduFormList(programId);
      getEduTechnologyList(programId);
      getCompetitionPeriodList(programId);
      getEduGridList(programId);
      getAcademicHourDurationList(programId);
    }
  }, [programId]);

  useEffect(() => {
    if (savedItemId) onSuccess(savedItemId);
  }, [onSuccess, savedItemId]);

  if (getInitDataStatus === 'pending') return <LoadingOverlay loading />;
  if (getInitDataStatus === 'fail') return <ErrorMessage />;
  if (notFoundError) return <ErrorMessage message={notFoundError} />;

  return (
    <div className="flex flex-col space-y-8">
      <Typography as="h2" size="32px" fontWeight="semibold">
        {title}
      </Typography>
      <LoadingWrapper loadingStatusList={statusList} errorStatusList={errorStatusList}>
        <div>
          {initData && (
            <Formik<T>
              initialValues={initData}
              validateOnBlur={false}
              validateOnChange={false}
              validateOnMount={false}
              initialErrors={{}}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <>
                <FormPrompt isEnabled={!savedItemId} />
                <CommonFormContent onReset={onReset} errorStore={errorStore} dismissErrorStore={dismissErrorStore} />
              </>
            </Formik>
          )}
        </div>
      </LoadingWrapper>
    </div>
  );
};
