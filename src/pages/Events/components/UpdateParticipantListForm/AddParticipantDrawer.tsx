import React from 'react';
import { EventParticipantsInfo } from '@src/pages/Events/model/types';
import { Form, Formik, useFormikContext } from 'formik';
import { Drawer, FormButtonGroup, ScrollArrow } from '@src/components';
import { useFilterByFullName, usePrepareParticipantList, useSortParticipants } from '@src/pages/Events/model/hooks';
import { useBackgroundClassName } from '@utils/hooks';
import { AddParticipantCard, EmptyFilteredParticipantList, FullnameFilter } from '@src/pages/Events/components';
import { Typography } from '@kit-edu/typography';
import { Button } from '@kit-edu/button';
import { useStore } from 'effector-react';
import { initParticipantDataStore } from '@src/pages/Events/model';

export type AddParticipantDrawerProps = {
  authorId: string;
  isOpen: boolean;
  onReset: () => void;
  onSubmit: (values: EventParticipantsInfo) => void;
};
export const AddParticipantDrawer = ({ isOpen, onReset, onSubmit }: AddParticipantDrawerProps) => {
  const { values } = useFormikContext<EventParticipantsInfo>();
  const backgroundColor = useBackgroundClassName();
  const initParticipants = useStore(initParticipantDataStore.$value);
  const preparedData = usePrepareParticipantList(initParticipants ?? []);
  const filteredInitData = useFilterByFullName(preparedData);
  const sortedVals = useSortParticipants(filteredInitData);

  return (
    <Drawer isOpen={isOpen} onClose={onReset} containerClassname="bg-base-200">
      {isOpen && (
        <div className=" px-[34px] h-full overflow-auto" data-testid="addingParticipantsWidget">
          <div className={`sticky top-0 left-0 z-20 ${backgroundColor} pt-6 pb-[18px] flex flex-col gap-[26px] `}>
            <div className="flex justify-between items-center space-x-4">
              <Typography as="h3" fontWeight="semibold" size="24px" lineHeight="high">
                Добавление участников
              </Typography>
              <Button
                onClick={onReset}
                size="medium"
                appearance="dark-outline"
                className="w-10 h-10"
                shape="circular"
                iconLeftName="master-close"
              />
            </div>
            <FullnameFilter />
          </div>
          <Formik<EventParticipantsInfo>
            onSubmit={onSubmit}
            initialValues={{
              id: values.id,
              participants: [],
            }}
          >
            {() => {
              return (
                <>
                  <Form>
                    <ScrollArrow isDisabled={sortedVals.length === 0} className="bottom-[112px] bg-white" withoutOffset>
                      {sortedVals.length === 0 && <EmptyFilteredParticipantList />}
                      {sortedVals.length > 0 && (
                        <div className="space-y-2" data-testid="eventParticipantBlock">
                          {sortedVals.map((e) => (
                            <AddParticipantCard data={e} key={e.id} />
                          ))}
                        </div>
                      )}
                      <FormButtonGroup
                        onReset={onReset}
                        contentWrapperClassName="px-4"
                        submitLabel="Добавить"
                        withoutSidebar
                      />
                    </ScrollArrow>
                  </Form>
                </>
              );
            }}
          </Formik>
        </div>
      )}
    </Drawer>
  );
};
