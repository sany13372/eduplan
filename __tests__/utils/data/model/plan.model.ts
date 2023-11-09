import { DataGenerator } from '../generator.data';

interface Plan {
  title?: string;
  shortTitle?: string;
  eduForm?: { code: string; title: string; shortTitle: string };
  eduTechnology?: { code: string; title: string; shortTitle: string };
  competitionPeriod?: { code: string; name: string };
  eduGrid?: { code: string; name: string };
  enrollmentYear?: number;
  eduStartDate?: Date;
  doAccountHoursInAcademicHours?: boolean;
  academicHourDuration?: { code: string; name: string };
  doAccountLessonDuration?: boolean;
  academicHoursInLessonAmount?: number;
  doAccountHoursInCreditUnits?: boolean;
  academicHoursInCreditUnitAmount?: number;
}

export class PlanModel {
  title: string;

  shortTitle: string;

  eduForm: { code: string; title: string; shortTitle: string };

  eduTechnology: { code: string; title: string; shortTitle: string };

  competitionPeriod: { code: string; name: string };

  eduGrid: { code: string; name: string };

  enrollmentYear: number;

  eduStartDate: Date;

  doAccountHoursInAcademicHours: boolean;

  academicHourDuration: { code: string; name: string };

  doAccountLessonDuration: boolean;

  academicHoursInLessonAmount: number;

  doAccountHoursInCreditUnits: boolean;

  academicHoursInCreditUnitAmount: number;

  constructor(plan: Plan = {}) {
    const generator = new DataGenerator();

    this.title = plan.title ?? generator.words(2);
    this.shortTitle = plan.shortTitle ?? generator.words(1);
    this.eduForm = plan.eduForm ?? { title: 'Очно-заочная форма', shortTitle: 'ОЗО', code: 'oz' };
    this.eduTechnology = plan.eduTechnology ?? { title: 'Сетевая форма', shortTitle: 'Сетев.', code: 'net' };
    this.competitionPeriod = plan.competitionPeriod ?? { name: '4 года', code: '6' };
    this.eduGrid = plan.eduGrid ?? { name: '4 года, 8 семестров', code: '4' };
    this.enrollmentYear = plan.enrollmentYear ?? generator.date({ month: 1 }).getFullYear();
    this.eduStartDate = plan.eduStartDate ?? generator.date({ month: 1 });
    this.doAccountHoursInAcademicHours = plan.doAccountHoursInAcademicHours ?? true;
    this.academicHourDuration = plan.academicHourDuration ?? { name: '45 минут', code: '45' };
    this.doAccountLessonDuration = plan.doAccountLessonDuration ?? true;
    this.academicHoursInLessonAmount = plan.academicHoursInLessonAmount ?? generator.rangeNumber(1, 10);
    this.doAccountHoursInCreditUnits = plan.doAccountHoursInCreditUnits ?? true;
    this.academicHoursInCreditUnitAmount = plan.academicHoursInCreditUnitAmount ?? generator.rangeNumber(25, 45);
  }
}
