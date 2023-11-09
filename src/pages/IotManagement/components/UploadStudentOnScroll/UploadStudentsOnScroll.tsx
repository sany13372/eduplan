import { UploadOnScroll } from '@src/components';
import { useStore } from 'effector-react';
import debounce from 'lodash/debounce';
import { $baseInfo, $newFilters, studentTrajectoryMap } from '@src/pages/IotManagement/model';

const f = debounce(studentTrajectoryMap.get, 300);
export const UploadStudentsOnScroll = () => {
  const data = useStore(studentTrajectoryMap.$value);
  const filters = useStore($newFilters);
  const baseData = useStore($baseInfo);
  const status = useStore(studentTrajectoryMap.$status);
  const isLoading = status === 'pending';
  const isDisabled = data.data.length >= data.pagination.count;

  const getNewPage = () => {
    f({ data, planId: baseData.planId, filters });
  };

  return <UploadOnScroll isLoading={isLoading} isDisabled={isDisabled} handler={getNewPage} initialInView={false} />;
};
