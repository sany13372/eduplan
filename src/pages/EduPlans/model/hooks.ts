import { useAbility } from '@utils/hooks';

export type AdminsPermissions = {
  isVisible: boolean;
  isEditable: boolean;
};
export const useAdminsPermissions = (): AdminsPermissions => {
  const ability = useAbility();
  const isVisible = ability.can('read', 'EduPlan');
  const isEditable = ability.can('update', 'EduProgramAdmin');
  return {
    isVisible,
    isEditable,
  };
};
