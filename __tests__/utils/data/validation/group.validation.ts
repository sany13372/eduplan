import { DataGenerator } from '../generator.data';

const generate = new DataGenerator();

export const GROUP_VALIDATION_DATA = [
  {
    name: 'Обязательные значения - «Название»',
    title: { value: '', message: 'Поле обязательно для заполнения.' },
    type: { value: 'Академическая группа', message: null },
  },
  {
    name: 'Обязательные значения - «Тип группы»',
    title: { value: generate.words(2), message: null },
    type: { value: '', message: 'Поле обязательно для заполнения.' },
  },
  {
    name: 'Запредельные значения',
    title: {
      value: generate.word(16),
      message: 'Указанное значение длиннее, чем допустимо. Максимальная длина: 15 символов.',
    },
    type: { value: 'Академическая группа', message: null },
  },
  {
    name: 'Только пробелы',
    title: { value: ' ', message: 'Поле обязательно для заполнения.' },
    type: { value: 'Академическая группа', message: null },
  },
  {
    name: 'Граничные значения',
    title: { value: generate.word(15), message: null },
    type: { value: 'Академическая группа', message: null },
  },
];
