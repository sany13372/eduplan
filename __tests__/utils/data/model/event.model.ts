import { DataGenerator } from '../generator.data';

interface Event {
  isPublished?: boolean;
  kind?: { code: string; name: string };
  format?: { code: string; name: string };
  service?: { code: string; name: string };
  title?: string;
  link?: string;
  place?: string;
  description?: string;
  role?: string;
  startAt?: Date;
  endAt?: Date;
}

export class EventModel {
  kind: { code: string; name: string };

  format: { code: string; name: string };

  service: { code: string; name: string };

  title: string;

  link: string;

  place: string;

  description: string;

  role: string;

  startAt: Date;

  endAt: Date;

  isPublished: boolean;

  constructor(event: Event = {}) {
    const generator = new DataGenerator();

    this.isPublished = event.isPublished ?? true;
    this.kind = event.kind ?? { name: 'Вебинар', code: 'webinar' };
    this.format = event.format ?? { name: 'Смешанный', code: 'mixed' };
    this.service = event.service ?? { name: 'Другой сервис', code: 'other' };
    this.title = event.title ?? generator.words(2);
    this.link = event.link ?? generator.url();
    this.place = event.place ?? generator.streetAddress(true);
    this.description = event.description ?? generator.paragraph();
    this.role = event.role ? event.role : 'Организатор';
    this.startAt = event.startAt ?? new DataGenerator().date({ month: 1, hours: -1 });
    this.endAt = event.endAt ?? new DataGenerator().date({ month: 1 });
  }
}
