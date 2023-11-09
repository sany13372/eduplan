import { UploadOnScroll } from '@src/components';
import { useStore } from 'effector-react';
import debounce from 'lodash/debounce';
import { GetActionEffectorNode } from '@src/utils/effector';
import { GetStudentsDataParams, StudentsData } from '@src/pages/LessonSettings/model/types';
import { useMemo } from 'react';
import { Store } from 'effector';

type UploadStudentsOnScrollProps = {
  streamId: string;
  nodes: GetActionEffectorNode<GetStudentsDataParams, StudentsData>;
  filterStore: Store<string>;
};
export const UploadStudentsOnScroll = ({ streamId, nodes, filterStore }: UploadStudentsOnScrollProps) => {
  const data = useStore(nodes.$value);
  const filter = useStore(filterStore);
  const status = useStore(nodes.$status);
  const f = useMemo(() => debounce(nodes.get, 300), [nodes]);

  const isLoading = status === 'pending';
  const isDisabled = data.students.length >= data.pagination.count;
  const getNewPage = () => {
    f({ filter, students: data.students, pagination: data.pagination, streamId });
  };

  return <UploadOnScroll isLoading={isLoading} isDisabled={isDisabled} handler={getNewPage} initialInView={false} />;
};
