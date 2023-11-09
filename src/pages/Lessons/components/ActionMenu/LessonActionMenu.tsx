import { confirmLesson, deleteLesson, lessonUpdatePriority, showSaveLessonForm } from '@src/pages/Lessons/model';
import { Lesson, ThemeWithLessons } from '@src/pages/Lessons/model/types.new';
import { ActionMenu } from '@src/components';
import { useHistory, useParams } from 'react-router-dom';
import { EduPlanActivityParams, getPath } from '@src/constants/routes';
import { ReactComponent as MenuIcon } from '@src/assets/icons/common/menu.svg';
import { useMemo } from 'react';
import { getLessonContentRoute } from '@src/pages/Lessons/model/utils';

export type LessonActionMenuProps = {
  lesson: Lesson;
  theme: ThemeWithLessons;
};

export const LessonActionMenu: React.FC<LessonActionMenuProps> = ({ lesson, theme }) => {
  const history = useHistory();
  const { activityId } = useParams<EduPlanActivityParams>();
  const position = theme.lessons.findIndex((les) => les.id === lesson.id);

  const menuItems = useMemo(() => {
    const menuItemsDefault = [
      {
        id: 'edit',
        label: 'Редактировать',
        handler() {
          showSaveLessonForm({ themeId: theme.rowId, lessonId: lesson.id });
        },
      },
      {
        id: 'view',
        label: 'Посмотреть',
        handler() {
          const neededContentRoute = getLessonContentRoute(lesson.lessonContentType);
          history.push(
            getPath(neededContentRoute, {
              ':lessonId': lesson.id,
            }),
          );
        },
      },
      {
        id: 'confirm',
        label: lesson.isAllowRegistration ? 'Отменить согласование' : 'Согласовать',
        handler() {
          if (!lesson.hasContent && !lesson.isAllowRegistration) {
            // Попап выводит только текст
            confirmLesson.setErrors({
              _: 'Чтобы согласовать занятие, выберите пункт «Посмотреть» и добавьте контент в конструкторе',
            });
          } else {
            confirmLesson.update({
              lessonId: lesson.id,
              themeId: theme.id,
              isAllowRegistration: lesson.isAllowRegistration,
            });
          }
        },
      },
      {
        id: 'up',
        label: 'Передвинуть вверх',
        handler() {
          const priorityLesson = {
            firstId: lesson.rowId,
            secondId: theme.lessons[position - 1].rowId,
            eduPlanRowId: activityId,
          };
          lessonUpdatePriority.update(priorityLesson);
        },
      },
      {
        id: 'down',
        label: 'Передвинуть вниз',
        handler() {
          const priorityLesson = {
            firstId: lesson.rowId,
            secondId: theme.lessons[position + 1].rowId,
            eduPlanRowId: activityId,
          };
          lessonUpdatePriority.update(priorityLesson);
        },
      },
      {
        id: 'delete',
        label: 'Удалить',
        handler() {
          deleteLesson.setItem({ lessonId: lesson.id, themeId: theme.id });
        },
      },
    ];

    if (theme.lessons.length === 1) {
      return menuItemsDefault.filter((item) => item.id !== 'down' && item.id !== 'up');
    }

    if (position === 0) {
      return menuItemsDefault.filter((item) => item.id !== 'up');
    }

    if (theme.lessons.length - 1 === position) {
      return menuItemsDefault.filter((item) => item.id !== 'down');
    }

    return menuItemsDefault;
  }, [history, theme, lesson, activityId, position]);

  return <ActionMenu openNode={<MenuIcon className="cursor-pointer" />} menuItems={menuItems} />;
};
