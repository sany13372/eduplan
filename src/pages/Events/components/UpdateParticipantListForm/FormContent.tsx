import React from 'react';
import { EventParticipantsInfo } from '@src/pages/Events/model/types';
import { Form, useFormikContext } from 'formik';
import { UpdateParticipantCard } from '@src/pages/Events/components/ParticipantInfoCard';
import { ScrollArrow, FormButtonGroup } from '@src/components';
import { useSortParticipants } from '@src/pages/Events/model/hooks';
import {
  AddParticipantDrawer,
  AddParticipantDrawerProps,
} from '@src/pages/Events/components/UpdateParticipantListForm/AddParticipantDrawer';
import { removeParticipants } from '@src/pages/Events/model';
import { EmptyParticipantList } from '@src/pages/Events/components';
import { FormButtonGroupProps } from '@components/FormButtonGroup/FormButtonGroup';

type FormContentProps = { drawerProps: Omit<AddParticipantDrawerProps, 'onSubmit'> } & Pick<
  FormButtonGroupProps,
  'isLoading' | 'onReset'
>;
export const FormContent = ({ isLoading, onReset, drawerProps }: FormContentProps) => {
  const { values, setFieldValue, dirty } = useFormikContext<EventParticipantsInfo>();

  const sortedVals = useSortParticipants(values.participants);

  const onDrawerSubmit = (vals: EventParticipantsInfo) => {
    setFieldValue('participants', [...values.participants, ...vals.participants], false);
    removeParticipants(vals.participants);
    drawerProps.onReset();
  };

  return (
    <>
      <AddParticipantDrawer
        authorId={drawerProps.authorId}
        isOpen={drawerProps.isOpen}
        onReset={drawerProps.onReset}
        onSubmit={onDrawerSubmit}
      />
      <ScrollArrow isDisabled={false} className="bottom-[112px]">
        <Form className="space-y-4">
          {sortedVals.length === 0 && <EmptyParticipantList buttonName="Пригласить" />}
          {sortedVals.length > 0 && (
            <div className="space-y-2" data-testid="eventParticipantBlock">
              {sortedVals.map((e) => (
                <UpdateParticipantCard data={e} key={e.id} />
              ))}
            </div>
          )}

          <FormButtonGroup onReset={onReset} isLoading={isLoading} submitIsDisabled={!dirty} />
        </Form>
      </ScrollArrow>
    </>
  );
};
