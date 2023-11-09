import { castNotSkeleton } from 'gqty';
import { query } from '@src/gql-client';
import sortBy from 'lodash/sortBy';
import { Reference } from '@src/pages/ActivityTopics/model/types';

export const getActivityPartTypesQuery = (spaceId: string): Reference[] => {
  const items = query
    .readEduPlanActivityPartTypeSettings({
      where: {
        spaceId: { _eq: spaceId },
        _or: [{ isDisabled: { _is_null: true } }, { isDisabled: { _eq: false } }],
      },
    })
    .map(castNotSkeleton)
    .filter(({ eduPlanActivityPartType }) => !!eduPlanActivityPartType)
    .map(({ itemId, eduPlanActivityPartType }) => ({
      id: itemId || '',
      caption: eduPlanActivityPartType?.title || '',
      systemCode: eduPlanActivityPartType?.systemCode || '',
    }))
    // NOTE: В настоящий момент, выбрать тип темы (части) нельзя, по умолчанию все темы
    //       относятся к типу "Тема".
    .filter((partType) => partType.systemCode === 'topic');

  return sortBy(items, (i) => i.caption);
};
