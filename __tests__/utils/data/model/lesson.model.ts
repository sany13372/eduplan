import { DataGenerator } from '../generator.data';

interface Lesson {
  title?: string;
  kind?: { code: string; title: string; shortTitle: string };
  isContentAdded?: boolean;
  isAllowRegistration?: boolean;
}

export class LessonModel {
  title: string;

  kind: { code: string; title: string; shortTitle: string };

  isContentAdded: boolean;

  isAllowRegistration: boolean;

  constructor(lesson: Lesson = {}) {
    const generator = new DataGenerator();

    this.title = lesson.title ?? generator.productName();
    this.kind = lesson.kind ?? { code: 'learning', title: 'Обучение', shortTitle: 'обуч.' };
    this.isContentAdded = lesson.isContentAdded ?? true;
    this.isAllowRegistration = lesson.isAllowRegistration ?? true;
  }
}
