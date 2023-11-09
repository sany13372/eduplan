import { DataGenerator } from '../generator.data';

interface Period {
  type?: string;
  title?: string;
  startDate?: Date;
  endDate?: Date;
}

export class PeriodModel {
  type: string;

  title: string;

  startDate: Date;

  endDate: Date;

  constructor(period: Period = {}) {
    const generator = new DataGenerator();
    this.type = period.type ?? `Период обучения`;
    this.title = period.title ?? generator.words(2);
    this.startDate = period.startDate ?? generator.date({ month: 1, day: 1 });
    this.endDate = period.endDate ?? generator.date({ month: 1, day: 7 });
  }
}
