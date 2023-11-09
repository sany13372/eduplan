import { UploadOnScroll } from '@src/components';
import { useStore } from 'effector-react';
import debounce from 'lodash/debounce';
import { $baseInfoStore, getPageData, getPageDataFx, groupStudentsMap } from '@src/pages/StudentGroupList/model';

const f = debounce(getPageData, 300);
export const UploadStudentsOnScroll = ({ groupId }: { groupId: string }) => {
  const data = useStore(groupStudentsMap.$value);
  const item = data[groupId];
  const { planId } = useStore($baseInfoStore);
  const isPending = useStore(getPageDataFx.pending);
  const isDisabled = !item || item.students.length >= item.pagination.count;

  const getNewPage = () => {
    f({ groupId, planId, data: item });
  };

  return <UploadOnScroll isLoading={isPending} isDisabled={isDisabled} handler={getNewPage} initialInView={false} />;
};
