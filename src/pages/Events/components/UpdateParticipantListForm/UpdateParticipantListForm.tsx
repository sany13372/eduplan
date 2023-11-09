import { EventParticipantsInfo } from '@src/pages/Events/model/types';
import { Formik } from 'formik';
import { setEventParticipants } from '@src/pages/Events/model';
import { FormPrompt } from '@sber-universe/om-component-library';
import React, { useEffect, useMemo } from 'react';
import { useStore } from 'effector-react';
import { getPath, MfeRoutes } from '@constants/routes';
import { useHistory } from 'react-router-dom';
import { FormContent } from '@src/pages/Events/components/UpdateParticipantListForm/FormContent';
import { AddParticipantDrawerProps } from '@src/pages/Events/components/UpdateParticipantListForm/AddParticipantDrawer';
import { openSuccessToast } from '@utils/helpers/toast';

type UpdateParticipantListFormProps = {
  initData: EventParticipantsInfo;
  drawerProps: Omit<AddParticipantDrawerProps, 'onSubmit'>;
};
export const UpdateParticipantListForm = ({ initData, drawerProps }: UpdateParticipantListFormProps) => {
  const history = useHistory();

  const { id: eventId } = initData;
  const setParticipantsStatus = useStore(setEventParticipants.$status);
  const isLoading = useMemo(() => setParticipantsStatus === 'pending', [setParticipantsStatus]);
  const isSaved = useMemo(() => setParticipantsStatus === 'done', [setParticipantsStatus]);

  const resetClickHandler = () => {
    history.push(getPath(MfeRoutes.EVENT_VIEW, { ':eventId': initData.id }, { tab: 'participant' }));
  };

  useEffect(() => {
    if (setParticipantsStatus === 'done') {
      openSuccessToast('Список участников успешно обновлён');
      history.push(getPath(MfeRoutes.EVENT_VIEW, { ':eventId': eventId }, { tab: 'participant' }));
    }
  }, [eventId, history, setParticipantsStatus]);

  return (
    <Formik<EventParticipantsInfo>
      onSubmit={(values) => {
        setEventParticipants.add(values);
      }}
      initialValues={initData}
    >
      <>
        <FormPrompt isEnabled={!isSaved} />
        <FormContent onReset={resetClickHandler} isLoading={isLoading} drawerProps={drawerProps} />
      </>
    </Formik>
  );
};
