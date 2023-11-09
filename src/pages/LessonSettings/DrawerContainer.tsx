import { useStore } from 'effector-react';
import {
  $drawerInfoMapStore,
  confirmUpdateStreamDatesDrawerClose,
  confirmUpdateStreamTitleDrawerClose,
} from '@src/pages/LessonSettings/model';
import {
  CreateStreamDrawer,
  LinkStudentsDrawer,
  LinkTeachersDrawer,
  UpdateScoreInfoDrawer,
  UpdateStreamDrawer,
  ViewLinkedStudentsDrawer,
  ViewLinkedTeachersDrawer,
  ViewScoreInfoDrawer,
  ViewStreamDrawer,
} from '@src/pages/LessonSettings/components';

export const DrawerContainer = () => {
  const drawerInfoMap = useStore($drawerInfoMapStore);
  return (
    <>
      <CreateStreamDrawer isOpen={Boolean(drawerInfoMap['CREATE_STREAM'])} data={drawerInfoMap['CREATE_STREAM']} />
      <ViewStreamDrawer isOpen={Boolean(drawerInfoMap['VIEW_STREAM'])} data={drawerInfoMap['VIEW_STREAM']} />
      <UpdateStreamDrawer
        isOpen={Boolean(drawerInfoMap['UPDATE_STREAM_TITLE'])}
        data={drawerInfoMap['UPDATE_STREAM_TITLE']}
        type="UPDATE_STREAM_TITLE"
        title="Редактирование названия потока"
        successToastMessage="Название потока изменено"
        confirmNodes={confirmUpdateStreamTitleDrawerClose}
      />
      <UpdateStreamDrawer
        isOpen={Boolean(drawerInfoMap['UPDATE_STREAM_DATES'])}
        data={drawerInfoMap['UPDATE_STREAM_DATES']}
        type="UPDATE_STREAM_DATES"
        title="Настройка дат"
        successToastMessage="Изменения сохранены"
        confirmNodes={confirmUpdateStreamDatesDrawerClose}
      />
      <ViewScoreInfoDrawer isOpen={Boolean(drawerInfoMap['VIEW_SCORE_INFO'])} data={drawerInfoMap['VIEW_SCORE_INFO']} />
      <UpdateScoreInfoDrawer
        isOpen={Boolean(drawerInfoMap['UPDATE_SCORE_INFO'])}
        data={drawerInfoMap['UPDATE_SCORE_INFO']}
      />
      <ViewLinkedTeachersDrawer
        isOpen={Boolean(drawerInfoMap['VIEW_LINKED_TEACHERS'])}
        data={drawerInfoMap['VIEW_LINKED_TEACHERS']}
      />
      <LinkTeachersDrawer isOpen={Boolean(drawerInfoMap['LINK_TEACHERS'])} data={drawerInfoMap['LINK_TEACHERS']} />
      <ViewLinkedStudentsDrawer
        isOpen={Boolean(drawerInfoMap['VIEW_LINKED_STUDENTS'])}
        data={drawerInfoMap['VIEW_LINKED_STUDENTS']}
      />
      <LinkStudentsDrawer isOpen={Boolean(drawerInfoMap['LINK_STUDENTS'])} data={drawerInfoMap['LINK_STUDENTS']} />
    </>
  );
};
