/* eslint-disable react-hooks/exhaustive-deps */
import { Drawer, LoadingWrapper } from '@sber-universe/om-component-library';
import {
  confirmUpdateScoreInfoDrawerClose,
  controlFormStore,
  saveScoreInfo,
  scaleElementTypesStore,
  scaleTypesStore,
  setDrawerInfo,
} from '@src/pages/LessonSettings/model';
import React, { useMemo } from 'react';
import { useStore } from 'effector-react';
import { DrawerData, ScoreInfo } from '@src/pages/LessonSettings/model/types';
import { Formik, validateYupSchema, yupToFormErrors } from 'formik';
import { scoreInfoValidationSchema } from '@src/pages/LessonSettings/model/validation';
import { useItemsInfo, useScoreInfo } from '@src/pages/LessonSettings/model/hooks';
import { defaultGradeSystemCode, defaultControlForm } from '@src/pages/LessonSettings/model/constants';
import { useConfirmCallbackWrapped } from '@src/utils/hooks';

import { FormContent } from './FormContent';

const useInitScoreInfo = ({ data }: { data: DrawerData | null }): ScoreInfo => {
  const { lesson, theme } = useItemsInfo(data);
  const currentScoreInfoval = useScoreInfo(lesson?.id);
  const scaleTypes = useStore(scaleTypesStore.$items);
  const scaleElementTypes = useStore(scaleElementTypesStore.$items);

  const defaultGrade = scaleTypes.find((e) => e.systemCode === defaultGradeSystemCode) ?? scaleTypes[0];
  const defaultGradeSettings = scaleElementTypes
    .filter((e) => e.gradeId === defaultGrade.id)
    .map((e) => ({ item: e, val: 0 }));
  const initVal: ScoreInfo = useMemo(() => {
    return (
      currentScoreInfoval ?? {
        lessonId: lesson?.id ?? '',
        themeId: theme?.id ?? '',
        gradeSettings: defaultGradeSettings,
        gradeScale: defaultGrade,
        controlForm: defaultControlForm,
        lessonScoreValue: 0,
        contentScoreValue: 0,
      }
    );
  }, [defaultGrade, defaultGradeSettings, lesson, theme, currentScoreInfoval]);
  return initVal;
};
export type ViewScoreInfoDrawerProps = {
  isOpen: boolean;
  data: DrawerData | null;
};
export const UpdateScoreInfoDrawer = ({ isOpen, data }: ViewScoreInfoDrawerProps) => {
  const portalId = 'updateScoreInfoPortalId';
  const { lesson } = useItemsInfo(data);
  const controlFormsStatus = useStore(controlFormStore.$status);
  const scaleTypesStatus = useStore(scaleTypesStore.$status);
  const scaleElementTypesStatus = useStore(scaleElementTypesStore.$status);
  const initData = useInitScoreInfo({ data });

  const onClose = () => {
    setDrawerInfo({ type: 'UPDATE_SCORE_INFO', val: null });
  };
  const onCloseWrapper = useConfirmCallbackWrapped({ callback: onClose, nodes: confirmUpdateScoreInfoDrawerClose });

  if (!lesson) return null;

  return (
    <Drawer
      containerClassname="max-w-[900px]"
      portalId={portalId}
      onClose={onCloseWrapper}
      isOpen={isOpen}
      lockScroll
      backDropProps={{
        isTransparent: true,
        isDisabled: false,
        isClickable: true,
      }}
    >
      <Drawer.Header title="Настройка оценки" onClose={onCloseWrapper} />
      <Drawer.Content containerClassname="flex flex-col gap-y-4">
        <LoadingWrapper
          loadingStatusList={[scaleTypesStatus, scaleElementTypesStatus, controlFormsStatus]}
          errorStatusList={[scaleTypesStatus, scaleElementTypesStatus, controlFormsStatus]}
        >
          <Formik<ScoreInfo>
            initialValues={initData}
            validate={(value) => {
              try {
                validateYupSchema(value, scoreInfoValidationSchema, true, value);
              } catch (err) {
                return yupToFormErrors(err); // for rendering validation errors
              }

              return {};
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            isInitialValid
            onSubmit={(values) => {
              saveScoreInfo(values);
            }}
          >
            <FormContent portalId={portalId} lesson={lesson} onResetClick={onCloseWrapper} />
          </Formik>
        </LoadingWrapper>
      </Drawer.Content>
    </Drawer>
  );
};
