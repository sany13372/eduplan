import { FC, useMemo } from 'react';
import { useStore } from 'effector-react';
import { Drawer } from '@src/components';
import {
  $groupId,
  $groupStudentModalName,
  groupStudentModalApi,
  studentsUpdated,
} from '@src/pages/StudentGroupList/model';
import { ChooseStudentsWidget } from '@src/widgets/ChooseStudents/ChooseStudentsWidget';
import { ImportStudentsWidget } from '@src/widgets/ImportStudents/ImportStudentsWidget';
import { ModalType } from '@src/pages/StudentGroupList/model/types';

import { StudentModalByType } from './StudentModalByType';

export const GroupStudentModal: FC<{ planId: string }> = ({ planId }) => {
  const groupStudentModalName = useStore($groupStudentModalName).modalType;
  const groupId = useStore($groupId);
  const data = useMemo(() => ({ groupId, planId }), [groupId, planId]);
  const renderGroupStudents = (groupStudentsType: ModalType | null) => {
    switch (groupStudentsType) {
      case ModalType.importStudents:
        return (
          <ImportStudentsWidget
            title="Импорт обучающихся"
            onSuccess={() => {
              studentsUpdated();
              groupStudentModalApi.close();
            }}
            onClose={groupStudentModalApi.close}
          />
        );
        break;
      case ModalType.chooseStudent:
        return (
          <ChooseStudentsWidget
            data={data}
            title="Добавление обучающихся"
            onClose={groupStudentModalApi.close}
            onSuccess={() => {
              studentsUpdated();
              groupStudentModalApi.close();
            }}
          />
        );
        break;
      default:
        return (
          <Drawer isOpen={Boolean(groupStudentModalName)} onClose={groupStudentModalApi.close}>
            <div className="px-9 py-7 h-full w-full overflow-auto bg-base-200">
              <StudentModalByType />
            </div>
          </Drawer>
        );
        break;
    }
  };
  return <>{renderGroupStudents(groupStudentModalName)}</>;
};
