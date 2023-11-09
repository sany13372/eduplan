import { UploadOnScroll } from '@src/components';
import { useStore } from 'effector-react';
import debounce from 'lodash/debounce';
import { $pageParams, groupStudents } from '@src/pages/GroupManagement/model';

const f = debounce(groupStudents.get, 300);

export const UploadStudentsOnScroll = () => {
  const data = useStore(groupStudents.$value);
  const status = useStore(groupStudents.$status);
  const isLoading = status === 'pending';
  const { groupId } = useStore($pageParams);

  const isDisabled = data.data.length >= data.pagination.count;

  const getNewPage = () => {
    f({ groupId, data });
  };

  return <UploadOnScroll isLoading={isLoading} isDisabled={isDisabled} handler={getNewPage} initialInView={false} />;
};
