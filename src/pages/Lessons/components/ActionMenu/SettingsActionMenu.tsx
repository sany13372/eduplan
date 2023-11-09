import { Lesson } from '@src/pages/Lessons/model/types';
import { useHistory } from 'react-router-dom';
import { ActionMenu, ActionMenuItemCustom } from '@src/components';
import { useMemo } from 'react';
import { getPath, MfeRoutes } from '@constants/routes';

type SettingsActionMenuProps = {
  data: Lesson;
};
export const SettingsActionMenu = ({ data }: SettingsActionMenuProps): JSX.Element => {
  const history = useHistory();

  const actionItems: ActionMenuItemCustom[] = useMemo(() => {
    if (data.elementType !== 'lesson') return [];
    const settingId = data.itemInfo.settings?.id;
    const lessonId = data.itemInfo.id;
    const queryParam = settingId ? { settingId } : undefined;
    return [
      {
        id: 'update',
        label: 'Настроить даты',
        handler: () => {
          history.push(getPath(MfeRoutes.EDU_PLAN_INFO_LESSON_SETTINGS, { ':lessonId': lessonId }, queryParam));
        },
      },
    ];
  }, [data, history]);

  const isVisible = useMemo(() => actionItems.length > 0, [actionItems]);

  return <>{isVisible && <ActionMenu menuItems={actionItems} />}</>;
};
