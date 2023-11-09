/* eslint-disable react-hooks/exhaustive-deps */
import { GroupFormContent, GroupInfoContainer, TitleCard } from '@src/pages/Desc/components';
import { Form, Formik } from 'formik';
import { EduPlanDesc } from '@src/pages/Desc/model/types';
import { useStore } from 'effector-react';
import { eduPlanDesc, updateEduPlanDesc } from '@src/pages/Desc/model';
import { FormButtonGroup } from '@src/components';
import { useHistory } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';
import { defaultEduPlanDescription, info } from '@src/pages/Desc/model/constants';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import { addEduPlanSchema } from '@src/pages/Desc/model/validation';
import { useEffect, useMemo } from 'react';
import { DescPrompt } from '@src/pages/Desc/components/DescPrompt';
import { openSuccessToast } from '@utils/helpers/toast';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';

export const UpdateDesc = () => {
  const data = useStore(eduPlanDesc.$value);
  const history = useHistory();
  const updatedId = useStore(updateEduPlanDesc.$updatedId);

  const prevPath = useMemo(() => getPath(MfeRoutes.EDU_PLAN_DESC_VIEW, { ':planId': data.id }), [data]);
  useEffect(() => {
    setNavigationInfo({
      label: 'К карточке плана обучения',
      to: prevPath,
    });
    return resetNavigationInfo;
  }, []);
  useEffect(() => {
    if (updatedId) {
      openSuccessToast('Данные витрины успешно обновлены');
      eduPlanDesc.get(data.id);
      history.push(prevPath);
    }
  }, [updatedId]);

  useEffect(() => {
    return () => {
      updateEduPlanDesc.reset();
      updateEduPlanDesc.resetErrors();
    };
  }, []);

  const resetClickHandler = () => {
    const path = getPath(MfeRoutes.EDU_PLAN_DESC_VIEW, { ':planId': data.id });
    history.push(path);
  };
  const initData = useMemo(() => merge(cloneDeep(defaultEduPlanDescription), data), [data]);
  return (
    <div className="space-y-8" data-testid="settingDesc">
      <TitleCard title="Настройка данных для витрины образовательных программ" />
      <Formik<EduPlanDesc>
        initialValues={initData}
        enableReinitialize={false}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
        validationSchema={addEduPlanSchema}
        onSubmit={(values) => {
          updateEduPlanDesc.update(values);
        }}
      >
        <>
          <DescPrompt />
          <Form>
            <div className="space-y-8">
              <GroupInfoContainer titleInfo={info.b2c} key="b2c">
                <GroupFormContent withUrl prefix="b2c" />
              </GroupInfoContainer>
              <GroupInfoContainer titleInfo={info.b2b} key="b2b">
                <GroupFormContent prefix="b2b" />
              </GroupInfoContainer>
            </div>
            <FormButtonGroup onReset={resetClickHandler} />
          </Form>
        </>
      </Formik>
    </div>
  );
};
