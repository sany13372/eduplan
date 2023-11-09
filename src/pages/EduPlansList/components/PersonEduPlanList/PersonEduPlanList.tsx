import { SimpleTable } from '@sber-universe/om-component-library';
import { EduPlanShortInfo } from '@src/pages/EduPlansList/model/types';
import { useEduPlanListColumns } from '@src/pages/EduPlansList/model/hooks';

type PersonEduPlanListProps = { data: EduPlanShortInfo[] };
export const PersonEduPlanList = ({ data }: PersonEduPlanListProps) => {
  const columns = useEduPlanListColumns({ withActions: false });
  return <SimpleTable<EduPlanShortInfo> data={data} columns={columns} />;
};
