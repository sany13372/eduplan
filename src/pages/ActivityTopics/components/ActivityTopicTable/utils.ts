import { Column } from '@sber-universe/om-component-library';
import { TopicRow } from '@src/pages/ActivityTopics/model/types';

export const nest = (times: number, column: Column<TopicRow>): Column<TopicRow> => {
  let result = column;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < times; i++) {
    result = {
      id: `${column.id}-${i + 1}`,
      Header: '',
      columns: [result],
    };
  }

  return result;
};
