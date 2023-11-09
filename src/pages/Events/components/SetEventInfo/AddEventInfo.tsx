import React, { useMemo } from 'react';
import { setEvent, eventFormatStore, eventKindStore } from '@src/pages/Events/model';
import { getPath, MfeRoutes } from '@constants/routes';
import { useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';
import { SetEventInfoForm } from '@src/pages/Events/components/SetEventInfo/SetEventInfoForm';
import { SetEventInfo } from '@src/pages/Events/model/types';
import { defaultEventFormat, defaultEventKind } from '@src/pages/Events/model/constants';

type AddEventInfoProps = {
  ownerId: string;
  authorId: string;
};
export const AddEventInfo = ({ ownerId, authorId }: AddEventInfoProps) => {
  const eventKindList = useStore(eventKindStore.$value);
  const eventFormatList = useStore(eventFormatStore.$value);
  const history = useHistory();

  const initData = useMemo(() => {
    return {
      kind: eventKindList.find((e) => e.systemCode === defaultEventKind),
      format: eventFormatList.find((e) => e.systemCode === defaultEventFormat),
      videoConfKind: undefined,
      title: '',
      id: '',
      date: '',
      description: '',
      endTime: '',
      ownerId,
      authorId,
      startTime: '',
    };
  }, [eventFormatList, eventKindList, ownerId, authorId]);

  const createEventStatus = useStore(setEvent.$status);

  const submitHandler = (values: SetEventInfo) => {
    setEvent.add(values);
  };
  const resetHandler = () => {
    history.push(getPath(MfeRoutes.EDU_PLAN_EVENTS, { ':planId': ownerId }));
  };

  return (
    <SetEventInfoForm
      initData={initData}
      onSubmit={submitHandler}
      onReset={resetHandler}
      isLoading={createEventStatus === 'pending'}
    />
  );
};
