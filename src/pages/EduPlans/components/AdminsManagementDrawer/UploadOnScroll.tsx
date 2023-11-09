import { UploadOnScroll } from '@src/components';
import { useStore } from 'effector-react';
import debounce from 'lodash/debounce';
import { availableToLinkAdmins } from '@src/pages/EduPlans/model';
import { useParams } from 'react-router-dom';
import { EduPlanParams } from '@constants/routes';

const f = debounce(availableToLinkAdmins.get, 300);
export const UploadTeachersOnScroll = () => {
  const data = useStore(availableToLinkAdmins.$value);
  const status = useStore(availableToLinkAdmins.$status);
  const isLoading = status === 'pending';
  const isDisabled = data.teachers.length >= data.pagination.count;
  const { planId } = useParams<EduPlanParams>();

  const getNewPage = () => {
    f({ planId, ...data });
  };

  return <UploadOnScroll isLoading={isLoading} isDisabled={isDisabled} handler={getNewPage} initialInView={false} />;
};
