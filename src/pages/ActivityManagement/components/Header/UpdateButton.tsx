import { LinkButton } from '@kit-edu/button';
import { getPath, MfeRoutes } from '@src/constants/routes';

type UpdateButtonProps = {
  planId: string;
  planRowId: string;
};
export const UpdateButton = ({ planId, planRowId }: UpdateButtonProps) => {
  return (
    <LinkButton
      appearance="primary"
      size="medium"
      iconLeftName="master-edit"
      to={getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_EDIT, {
        ':planId': planId,
        ':activityId': planRowId,
      })}
    />
  );
};
