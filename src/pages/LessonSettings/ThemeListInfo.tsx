import { useFilteredThemeList } from '@src/pages/LessonSettings/model/hooks';
import {
  DeleteLinkedStudentConfirmDialog,
  DeleteLinkedTeacherConfirmDialog,
  DeleteScoreInfoConfirmDialog,
  DeleteStreamConfirmDialog,
  ThemeFilter,
  ThemeInfo,
} from '@src/pages/LessonSettings/components';

export const ThemeListInfo = () => {
  const filteredThemeList = useFilteredThemeList();

  return (
    <div className="flex flex-col gap-[50px] ">
      <ThemeFilter />
      <div className="flex flex-col gap-[50px]">
        {filteredThemeList.map((e) => (
          <ThemeInfo key={e.id} theme={e} />
        ))}
      </div>
      <DeleteStreamConfirmDialog />
      <DeleteScoreInfoConfirmDialog />
      <DeleteLinkedTeacherConfirmDialog />
      <DeleteLinkedStudentConfirmDialog />
    </div>
  );
};
