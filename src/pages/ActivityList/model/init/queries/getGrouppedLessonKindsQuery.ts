import { castNotSkeleton } from 'gqty';
import sortBy from 'lodash/sortBy';
import { query } from '@src/gql-client';
import { WorkKind, LessonKind } from '@src/pages/ActivityList/model/types';

const queryFilter = (spaceId: string) => {
  return {
    where: {
      spaceId: { _eq: spaceId },
      _or: [{ isDisabled: { _is_null: true } }, { isDisabled: { _eq: false } }],
    },
  };
};

type Item = {
  id: string;
  systemCode: string;
  title: string;
  shortTitle: string;
  priority: number;
  parentId?: string;
};

const getLessonKinds = (spaceId: string): Item[] => {
  return query
    .readLessonKindSettings(queryFilter(spaceId))
    .map(castNotSkeleton)
    .filter(({ lessonKind }) => !!lessonKind)
    .filter(({ lessonKind }) => !lessonKind?.deletedAt) // фильтруем так т.к. в схеме нет возможности отфильтровать при запросе
    .map(({ itemId, lessonKind }) => ({
      id: itemId || '',
      systemCode: lessonKind?.systemCode || '',
      title: lessonKind?.title || '',
      shortTitle: lessonKind?.shortTitle || '',
      priority: lessonKind?.priority || 0,
      parentId: lessonKind?.lessonTypeId || '',
    }));
};

const getLessonTypes = (spaceId: string): Item[] => {
  return query
    .readLessonTypeSettings(queryFilter(spaceId))
    .map(castNotSkeleton)
    .filter(({ lessonType }) => !!lessonType)
    .map(({ itemId, lessonType }) => ({
      id: itemId || '',
      systemCode: lessonType?.systemCode || '',
      title: lessonType?.title || '',
      shortTitle: lessonType?.shortTitle || '',
      priority: lessonType?.priority || 0,
      parentId: lessonType?.eduWorkKindId || '',
    }));
};

const getWorkKinds = (spaceId: string): Item[] => {
  return query
    .readEduWorkKindSettings(queryFilter(spaceId))
    .map(castNotSkeleton)
    .filter(({ eduWorkKind }) => !!eduWorkKind)
    .map(({ itemId, eduWorkKind }) => ({
      id: itemId || '',
      systemCode: eduWorkKind?.systemCode || '',
      title: eduWorkKind?.title || '',
      shortTitle: eduWorkKind?.shortTitle || '',
      priority: eduWorkKind?.priority || 0,
    }));
};

const sort = (items: Item[]) => sortBy(items, [(i) => i.priority, (i) => i.title]);

const filterByParent = (items: Item[], parentId: string) => items.filter((i) => i.parentId === parentId);

export const getGrouppedLessonKindsQuery = (spaceId: string): WorkKind[] => {
  // Иерархия:
  //   WorkKind --1--N--> LessonType --1--N--> LessonKind

  // Из БТ:
  // > Количество часов [вводится] для каждого используемого вида учебных занятий
  // > (справочник "Виды учебных занятий") [lesson_type], который не относится к
  // > типу учебных занятий [lesson_kind] "Контроль знаний".

  const workKinds = getWorkKinds(spaceId);
  const lessonTypes = getLessonTypes(spaceId).filter((lt) => lt.systemCode !== 'control');
  const lessonKinds = getLessonKinds(spaceId);

  // Из БТ:
  // > [...] группируются по виду работ образовательной деятельности [edu_work_kind],
  // к которому они относятся (связь через тип учебных занятий [lesson_type]), [...]

  const lessonKindsByWorkKind = (workKindId: string): LessonKind[] => {
    return sort(filterByParent(lessonTypes, workKindId))
      .flatMap((lt) => sort(filterByParent(lessonKinds, lt.id)))
      .map((lk) => ({
        id: lk.id,
        caption: lk.title,
        shortTitle: lk.shortTitle,
      }));
  };

  return sort(workKinds)
    .map((wk) => ({
      id: wk.id,
      caption: wk.title,
      shortTitle: wk.shortTitle,
      lessonKinds: lessonKindsByWorkKind(wk.id),
    }))
    .filter((wk) => wk.lessonKinds.length > 0);
};
