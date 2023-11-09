import { UploadOnScroll } from '@src/components';
import { useStore } from 'effector-react';
import { $baseInfo, $filter, chooseStudentsInfo } from '@src/widgets/ChooseStudents/model';
import debounce from 'lodash/debounce';

const f = debounce(chooseStudentsInfo.get, 300);
export const UploadStudentsOnScroll = () => {
  const data = useStore(chooseStudentsInfo.$value);
  const filter = useStore($filter);
  const baseData = useStore($baseInfo);
  const status = useStore(chooseStudentsInfo.$status);
  const isLoading = status === 'pending';
  const isDisabled = data.data.length >= data.pagination.count;

  const getNewPage = () => {
    f({ baseInfo: baseData, data, filter });
  };

  return <UploadOnScroll isLoading={isLoading} isDisabled={isDisabled} handler={getNewPage} initialInView={false} />;
};
