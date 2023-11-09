import { DataGenerator } from '../generator.data';

const generate = new DataGenerator();

export const LESSON_VALIDATION_DATA = [
  {
    name: 'Обязательные значения - «Название»',
    title: { value: '', message: 'Поле обязательно для заполнения.' },
    kind: { value: 'Самостоятельная работа', message: null },
  },
  {
    name: 'Обязательные значения - «Вид занятия»',
    title: { value: generate.words(2), message: null },
    kind: { value: '', message: 'Поле обязательно для заполнения.' },
  },
  {
    name: 'Запредельные значения',
    title: {
      value: generate.word(256),
      message: 'Указанное значение длиннее, чем допустимо. Максимальная длина: 255 символов.',
    },
    kind: { value: 'Самостоятельная работа', message: null },
  },
  {
    name: 'Только пробелы',
    title: { value: ' ', message: 'Поле обязательно для заполнения.' },
    kind: { value: 'Самостоятельная работа', message: null },
  },
  {
    name: 'Граничные значения',
    title: { value: generate.word(255), message: null },
    kind: { value: 'Самостоятельная работа', message: null },
  },
];
