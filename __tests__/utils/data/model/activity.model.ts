import { DataGenerator } from '../generator.data';

export class ActivityModel {
  title: string;

  shortTitle: string;

  category: string;

  constructor(activity: { title?: string; shortTitle?: string; category?: string }) {
    this.title = activity.title ? activity.title : new DataGenerator().words(2);
    this.shortTitle = activity.shortTitle ? activity.shortTitle : new DataGenerator().words(1);
    this.category = activity.category ? activity.category : 'Дисциплина';
  }
}
