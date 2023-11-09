import { faker } from '@faker-js/faker';

import { CommonHelper } from '../common.helper';

faker.locale = 'ru';

const commonHelper = new CommonHelper();

export class DataGenerator {
  /**
   * **Метод для генерации числа**
   * В качестве входного парраметра передается необходимое кол-во символов на выходе.
   * Возвращает строковое число произвольно заданной длины.
   * Пример: this.numberStr(5); // 48172
   */
  numberStr = (length: number): string => faker.random.numeric(length);

  /**
   * **Метод для генерации числа с указанием диапазона**
   * В качестве входного парраметра передается минимальное/максимальное значение диапазона.
   * Возвращает произвольно строковое число в рамках заданного диапазона.
   * Пример: this.rangeNumber(2 , 6); // 3
   */
  rangeNumber = (min: number, max: number): number => faker.datatype.number({ min, max });

  /**
   * **Метод для генерации имени**
   * Пример: this.firstName(); // Brando
   */
  firstName = (): string => commonHelper.removeSpecChar(faker.name.firstName());

  /**
   * **Метод для генерации фамилии**
   * Пример: this.lastName(); // Hackett
   */
  lastName = (): string => commonHelper.removeSpecChar(faker.name.lastName());

  /**
   * **Метод для генерации отчества**
   * Пример: this.middleName(); // Kyle
   */
  middleName = (): string => commonHelper.removeSpecChar(faker.name.middleName());

  /**
   * **Метод для генерации адреса электронной почты**
   * Пример: this.email(); // Estrella.OHara76@yandex.ru
   */
  email = (): string => faker.internet.email();

  /**
   * **Метод для генерации слов с указанием кол-ва**
   * В качестве входного параметра передается необходимое «кол-во» слов для последующей генерации.
   * Пример: this.words(2); // female набережная
   */
  words = (count: number): string => commonHelper.removeSpecChar(faker.random.words(count));

  /**
   * **Метод для генерации слова заданной длины**
   * В качестве входного параметра передается необходимое «кол-во» символов в слове.
   * Пример: this.word(6); // модели
   */
  word = (count: number): string => faker.random.alpha(count);

  /**
   * **Метод для генерации существительного**
   * Возвращает существительное произвольно заданной длины.
   * Пример: this.nounWord(8); // negligee
   */
  nounWord = (count: number): string => faker.word.noun(count);

  /**
   * **Метод для генерации названия профессии**
   * Пример: this.jobTitle(); // Главный страховой консультант
   */
  jobTitle = (): string => commonHelper.removeSpecChar(faker.name.jobTitle());

  /**
   * **Метод для генерации эмоджи**
   * Пример: this.emoji(); // :smiley:
   */
  emoji = (): string => faker.internet.emoji();

  /**
   * **Метод для генерации имени продукта**
   * Пример: this.productName(); // Невероятный Неодимовый Кулон
   */
  productName = (): string => commonHelper.removeSpecChar(faker.commerce.productName());

  /**
   * **Метод для генерации наименования компании**
   * Пример: this.companyName(); // ООО ПромРусЛимитед
   */
  companyName = (): string => commonHelper.removeSpecChar(faker.company.name());

  /**
   * **Метод для генерации суффикса компании**
   * Пример: this.companySuffix(); // Лимитед
   */
  companySuffix = (): string => commonHelper.removeSpecChar(faker.company.companySuffix());

  /**
   * **Метод для генерации параграфов**
   * В качестве входного параметра передается необходимое «кол-во»
   * параграфов для последующей генерации, по умолчанию установлено значение  «3»
   * Пример: this.paragraph(1); // Прогресса укрепления важные нас. Интересный активности мира.
   */
  paragraph = (sentenceCount = 3): string => commonHelper.removeSpecChar(faker.lorem.paragraph(sentenceCount));

  /**
   * **Метод для генерации ссылки**
   * Пример: this.url(); // http://fuzzy-pinkie.net
   */
  url = (): string => faker.internet.url();

  /**
   * **Метод для генерации адреса проживания**
   * По умолчанию указано булевое значение «true» - будет сгенерирован полный адрес.
   * В противном случае он просто сгенерирует почтовый адрес.
   * Пример: this.streetAddress(); // площадь Крестьянская, 655 кв. 049
   */
  streetAddress = (useFullAddress = true): string =>
    commonHelper.removeSpecChar(faker.address.streetAddress(useFullAddress));

  /**
   * **Метод для генерации пароля**
   * Соответствует формату «Должен содержать не менее 8 символов,
   * буквы латинского алфавита (a–z и A–Z), цифры (0–9). Не используйте пробел в пароле.».
   * Пример: this.password(); // 15Hc9lXEvv
   */
  password(): string {
    return faker.internet.password(10, false, /[a-zA-Z0-9]/, `${this.numberStr(2)}`);
  }

  /**
   * Метод для генерации даты с входными параметрами «Месяц/День/Год/Час»
   */
  date = ({ month = 0, day = 0, year = 0, hours = 0 }): Date => {
    const date = new Date();
    date.setDate(date.getDate() + day);
    date.setMonth(date.getMonth() + month);
    date.setFullYear(date.getFullYear() + year);
    date.setHours(date.getHours() + hours);
    return date;
  };

  INN(physicalPerson: boolean): string {
    if (physicalPerson) {
      let res = this.numberStr(10);
      res += this.getCheckDigits(res, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
      return res + this.getCheckDigits(res, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
    }
    const res = this.numberStr(9);
    return res + this.getCheckDigits(res, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
  }

  /**
   * **Метод для генерации валидного СНИЛС**
   * Пример: this.SNILS(); // 58510893922
   */
  SNILS(): string {
    const rnd = this.numberStr(9);
    const num = this.leftPad(rnd, 9, '0');

    let sum = num
      .split('')
      .map((val: string, i: number) => parseInt(val, 10) * (9 - i))
      .reduce((a: number, b: number) => a + b);

    if (sum > 101) {
      sum %= 101;
    }

    const checkSum = sum === 100 || sum === 101 ? '00' : this.leftPad(`${sum}`, 2, '0');
    return num + checkSum;
  }

  /**
   * Приватный метод для подсчета контрольной суммы СНИЛС
   */
  private leftPad = (str: string, len: number, ch: string | undefined): string => {
    const length = len - str.length + 1;
    return length > 0 ? new Array(length).join(ch) + str : str;
  };

  /**
   * Приватный метод для получения контрольной суммы ИНН
   */
  private getCheckDigits = (val: string, weightCoefficient: number[]): string => {
    let sum = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < val.length; i++) {
      sum += +val[i] * weightCoefficient[i];
    }
    return String((sum % 11) % 10);
  };
}
