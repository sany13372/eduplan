import React, { useEffect } from 'react';
import { deleteEvent, initParticipantDataStore, setEventParticipants } from '@src/pages/Events/model';
import { useStore } from 'effector-react';
import { FormButtonGroup, ScrollArrow } from '@src/components';
import { Form, Formik } from 'formik';
import { EventParticipantsInfo } from '@src/pages/Events/model/types';
import { AddParticipantCard, EmptyFilteredParticipantList } from '@src/pages/Events/components';
import { getPath, MfeRoutes } from '@constants/routes';
import { useHistory } from 'react-router-dom';
import { CustomPrompt, LoadingWrapper } from '@sber-universe/om-component-library';
import { useFilterByFullName, usePrepareParticipantList, useSortParticipants } from '@src/pages/Events/model/hooks';
import { prepareInitParticipantList } from '@src/pages/Events/model/helpers';

type EventParicipantsFormProps = {
  ownerId: string;
  id: string;
  authorId: string;
};
export const EventParicipantsForm = ({ id, authorId, ownerId }: EventParicipantsFormProps) => {
  const history = useHistory();
  const setParticipantsStatus = useStore(setEventParticipants.$status);
  const getInitDataStatus = useStore(initParticipantDataStore.$status);
  const initData = useStore(initParticipantDataStore.$value);
  const preparedData = usePrepareParticipantList(initData ?? []);
  const filteredInitData = useFilterByFullName(preparedData);
  const sortedData = useSortParticipants(filteredInitData);

  useEffect(() => {
    initParticipantDataStore.get({ eventId: id, ownerId });
  }, [id, ownerId]);
  const status = useStore(setEventParticipants.$status);

  const onReset = () => {
    history.push(getPath(MfeRoutes.EDU_PLAN_EVENTS, { ':planId': ownerId }));
  };

  return (
    <LoadingWrapper
      errorStatusList={[getInitDataStatus]}
      loadingStatusList={[getInitDataStatus]}
      errorInfoProps={{ variant: 'dark' }}
    >
      <Formik<EventParticipantsInfo>
        onSubmit={(values) => {
          setEventParticipants.add(values);
        }}
        initialValues={{
          id,
          participants: prepareInitParticipantList({ participantList: sortedData, authorId }),
        }}
      >
        {({ values }) => {
          return (
            <>
              <CustomPrompt
                navigate={(path: string) => {
                  deleteEvent({ id: values.id, isSilently: true });
                  history.push(path);
                }}
                when={setParticipantsStatus !== 'done'}
                shouldBlockNavigation={() => true}
              />
              <Form>
                <div className="flex flex-col h-full">
                  <div>
                    <ScrollArrow isDisabled={false} className="bottom-[112px]">
                      {sortedData.length === 0 && <EmptyFilteredParticipantList />}
                      {sortedData.length > 0 && (
                        <div className="space-y-2" data-testid="eventParticipantBlock">
                          {sortedData.map((e) => (
                            <AddParticipantCard data={e} key={e.id} />
                          ))}
                        </div>
                      )}
                      <FormButtonGroup onReset={onReset} isLoading={status === 'pending'} />
                    </ScrollArrow>
                  </div>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </LoadingWrapper>
  );
};
