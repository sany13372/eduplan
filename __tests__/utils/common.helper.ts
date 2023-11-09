import format from 'date-fns/format';

import { DateFormat } from './data/model/enums/dateFormat';

export class CommonHelper {
  /**
   * Метод для удаления специальных символов
   */
  removeSpecChar = (text: string): string =>
    text
      .replace(/[^a-zA-Zа-яА-Я0-9\s]/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

  getDateInFormat = (date: Date, dateFormat: DateFormat): string => {
    return format(date, dateFormat.toString());
  };
}
