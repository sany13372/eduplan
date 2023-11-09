import { DataGenerator } from '../generator.data';

export class EmployeeModel {
  isPps: boolean;

  email: string;

  birthDate: Date;

  lastName: string;

  firstName: string;

  middleName: string;

  personnelNumber: string;

  gender: { code: string; name: string };

  constructor(employee: {
    isPps?: boolean;
    email?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    birthDate?: Date;
    gender?: { code: string; name: string };
    personalNumber?: string;
  }) {
    this.isPps = employee.isPps ? employee.isPps : false;
    this.email = employee.email ? employee.email : new DataGenerator().email().toLocaleLowerCase();
    this.firstName = employee.firstName ? employee.firstName : new DataGenerator().firstName();
    this.lastName = employee.lastName ? employee.lastName : new DataGenerator().lastName();
    this.middleName = employee.middleName ? employee.middleName : new DataGenerator().middleName();
    this.birthDate = employee.birthDate ? employee.birthDate : new DataGenerator().date({ year: -18 });
    this.gender = employee.gender ? employee.gender : { name: 'Мужской', code: 'male' };
    this.personnelNumber = employee.personalNumber ? employee.personalNumber : new DataGenerator().numberStr(8);
  }
}
