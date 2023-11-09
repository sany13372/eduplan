import { Participant } from '@src/pages/Events/model/types';
import { $filters, $fullNameFilter } from '@src/pages/Events/model/index';
import { useStore } from 'effector-react';
import { useMemo } from 'react';
import sortBy from 'lodash/sortBy';
import { useAuth } from '@sber-universe/om-component-library';
import { organizerStatusInfo } from '@src/pages/Events/model/constants';

export const usePrepareParticipantList = (data: Participant[]): Participant[] => {
  const { personRole } = useAuth();
  const updatedData = useMemo(() => {
    return data.map((e) => (e.id === personRole ? { ...e, role: organizerStatusInfo } : e));
  }, [data, personRole]);
  return updatedData;
};

export const useFilterByFullName = (data: Participant[]): Participant[] => {
  const filterValue = useStore($fullNameFilter);
  const filteredData = useMemo(() => {
    const lowerCaseFilterValue = filterValue.toLowerCase();
    if (!lowerCaseFilterValue) return data;
    return data.filter((e) => e.fullName.toLowerCase().includes(lowerCaseFilterValue));
  }, [data, filterValue]);
  return filteredData;
};

export const useSortParticipants = (data: Participant[]): Participant[] => {
  const sortedData = useMemo(() => {
    return sortBy(data, ['role.id', 'fullName']);
  }, [data]);
  return sortedData;
};

export const useIsOnlyView = (): boolean => {
  const { participantId } = useStore($filters);
  const isOnlyView = Boolean(participantId);
  return isOnlyView;
};
