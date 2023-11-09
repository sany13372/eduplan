import { CustomPrompt } from '@sber-universe/om-component-library';
import { useHistory } from 'react-router-dom';
import { useFormikContext } from 'formik';
import isEqual from 'lodash/isEqual';
import { useStore } from 'effector-react';
import { updateEduPlanDesc } from '@src/pages/Desc/model';

export const DescPrompt = () => {
  const history = useHistory();
  const { initialValues, values } = useFormikContext();
  const updateId = useStore(updateEduPlanDesc.$updatedId);
  return (
    <CustomPrompt
      navigate={(path) => history.push(path)}
      when={!updateId}
      shouldBlockNavigation={() => !isEqual(initialValues, values)}
      dialogProps={{
        cancelLabel: 'Остаться',
        okLabel: 'Да, выйти',
        title: 'Подтверждение',
        description:
          'У вас есть несохраненные изменения. Если вы выйдете из режима редактирования, несохраненные данные будут утеряны. Выйти из режима редактирования?',
      }}
    />
  );
};
