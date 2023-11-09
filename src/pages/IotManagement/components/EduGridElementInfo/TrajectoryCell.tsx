import { TrajectoryData } from '@src/pages/IotManagement/model/types';
import { Icon } from '@kit-edu/icon';

type TrajectoryCellProps = {
  activityId: string;
  trajectory: TrajectoryData;
};
export const TrajectoryCell = ({ trajectory, activityId }: TrajectoryCellProps): JSX.Element => {
  return (
    <>
      {trajectory.rows.find((e) => e.activityId === activityId) ? (
        <Icon iconName="master-check" className="mx-auto text-[#4ade80]" />
      ) : (
        <Icon iconName="master-math-multiplication" className="mx-auto text-[#F43F5F]" />
      )}
    </>
  );
};
