import {
  courseStore,
  financingSourceStore,
  groupsStore,
  resetStudentModal,
  sexStore,
} from '@src/pages/GroupManagement/model';
import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { EffectState } from 'patronum/status';

export const useGetStudentFormDictionaries = (planId: string): EffectState[] => {
  const sexStoreStatus = useStore(sexStore.$status);
  const courseStoreStatus = useStore(courseStore.$status);
  const financingSourceStoreStatus = useStore(financingSourceStore.$status);
  const groupsStoreStatus = useStore(groupsStore.$status);

  useEffect(() => {
    sexStore.get(planId);
    courseStore.get(planId);
    financingSourceStore.get(planId);
    groupsStore.get(planId);
  }, [planId]);

  useEffect(() => resetStudentModal, []);
  return [courseStoreStatus, groupsStoreStatus, financingSourceStoreStatus, sexStoreStatus];
};

const getLoadingStatus = (statuses: EffectState[]): EffectState => {
  const isLoading = statuses.some((status) => status === 'initial' || status === 'pending');

  if (statuses.includes('fail')) return 'fail';
  if (isLoading) return 'pending';

  return 'done';
};

export const useStudentFormDictionaries = () => {
  const financingSources = useStore(financingSourceStore.$items);
  const courses = useStore(courseStore.$items);
  const groups = useStore(groupsStore.$items);

  const financingSourceStatus = useStore(financingSourceStore.$status);
  const coursesStatus = useStore(courseStore.$status);
  const groupsStatus = useStore(financingSourceStore.$status);

  const loadingStatus = getLoadingStatus([financingSourceStatus, coursesStatus, groupsStatus]);

  return {
    financingSources,
    courses,
    groups,
    loadingStatus,
  };
};
