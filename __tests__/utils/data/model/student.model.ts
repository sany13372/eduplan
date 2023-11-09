import { DataGenerator } from '../generator.data';
import { CommonHelper } from '../../common.helper';

interface Student {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  birthDate?: Date;
  personalNumber?: string;
  innNumber?: string;
  snilsNumber?: string;
  bookNumber?: string;
  gender?: { code: string; name: string };
  group?: string;
  financing?: { code: string; title: string; shortTitle: string };
  course?: { code: string; name: string };
  fullName?: string;
}

export class StudentModel {
  email: string;

  password: string;

  firstName: string;

  lastName: string;

  middleName: string;

  birthDate: Date;

  personalNumber: string;

  innNumber: string;

  snilsNumber: string;

  bookNumber: string;

  group: string;

  gender: { code: string; name: string };

  financing: { code: string; title: string; shortTitle: string };

  course: { code: string; name: string };

  fullName: string;

  constructor(student: Student = {}) {
    const generator = new DataGenerator();
    const helper = new CommonHelper();

    this.email = student.email ?? `student${generator.email().toLocaleLowerCase()}`;
    this.password = student.password ?? generator.password();
    this.firstName = student.firstName ?? helper.removeSpecChar(generator.firstName());
    this.lastName = student.lastName ?? helper.removeSpecChar(generator.lastName());
    this.middleName = student.middleName ?? helper.removeSpecChar(generator.middleName());
    this.birthDate = student.birthDate ?? generator.date({ year: -18 });
    this.personalNumber = student.personalNumber ?? generator.numberStr(8);
    this.innNumber = student.innNumber ?? generator.INN(true);
    this.snilsNumber = student.snilsNumber ?? generator.SNILS();
    this.bookNumber = student.bookNumber ?? generator.numberStr(8);
    this.gender = student.gender ?? { name: 'Мужской', code: 'male' };
    this.group = student.group ? student.group : new DataGenerator().numberStr(4);
    this.financing = student.financing ?? {
      title: 'По договору об оказании платных образовательных услуг',
      shortTitle: 'по договору',
      code: 'contract',
    };
    this.course = student.course ?? { name: '4 курс', code: '4' };
    this.fullName = `${this.lastName} ${this.firstName} ${this.middleName}` ?? '';
  }
}
