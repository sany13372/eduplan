import { FC } from 'react';
import { Drawer } from '@src/components';
import { useStore } from 'effector-react';
import {
  $groupManagementModalName,
  groupManagementModalApi,
  groupStudentsInitial,
  setPageParams,
} from '@src/pages/GroupManagement/model';
import { GroupModalByType } from '@src/pages/GroupManagement/components/GroupManagementModal/ModalByType';
import { ChooseStudentsWidget } from '@src/widgets/ChooseStudents/ChooseStudentsWidget';
import { useParams } from 'react-router-dom';
import { ActivityGroupParams } from '@constants/routes';
import { defaultGroupStudentsInfo } from '@src/pages/GroupManagement/model/constants';

export const GroupManagementModal: FC = () => {
  const groupManagementModalName = useStore($groupManagementModalName).modalType;
  const params = useParams<ActivityGroupParams>();

  return (
    <>
      {groupManagementModalName === 'chooseStudent' ? (
        <ChooseStudentsWidget
          data={params}
          title="Добавление обучающихся"
          onClose={groupManagementModalApi.close}
          onSuccess={() => {
            setPageParams(params);
            groupStudentsInitial.get({
              groupId: params.groupId,
              data: defaultGroupStudentsInfo,
            });
            groupManagementModalApi.close();
          }}
        />
      ) : (
        <Drawer isOpen={Boolean(groupManagementModalName)} onClose={groupManagementModalApi.close}>
          <div className="px-9 py-7 h-full w-full overflow-auto bg-base-200">
            <GroupModalByType />
          </div>
        </Drawer>
      )}
    </>
  );
};
