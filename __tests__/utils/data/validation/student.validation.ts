import { maxLengthExceeded, required } from '@utils/validation';

import { DataGenerator } from '../generator.data';

const generate = new DataGenerator();

export const STUDENT_VALIDATION_DATA = [
  {
    name: 'Обязательные значения',
    email: { value: '', message: 'Укажите адрес электронной почты' },
    lastName: { value: '', message: 'Укажите фамилию' },
    firstName: { value: '', message: 'Укажите имя' },
    middleName: { value: generate.middleName(), message: null },
    SNILS: { value: '', message: required() },
    INN: { value: '', message: required() },
    financing: { value: '', message: 'Выберите источник финансирования' },
    personalNumber: { value: generate.numberStr(8), message: null },
    bookNumber: { value: generate.numberStr(8), message: null },
  },
  {
    name: 'Запредельные значения',
    email: { value: generate.email(), message: null },
    lastName: { value: generate.word(26), message: maxLengthExceeded() },
    firstName: { value: generate.word(26), message: maxLengthExceeded() },
    middleName: { value: generate.word(26), message: maxLengthExceeded() },
    SNILS: { value: generate.SNILS(), message: null },
    INN: { value: generate.numberStr(16), message: maxLengthExceeded() },
    financing: { value: 'Местный бюджет', message: null },
    personalNumber: { value: generate.word(26), message: maxLengthExceeded() },
    bookNumber: { value: generate.word(26), message: maxLengthExceeded() },
  },
  {
    name: 'Некорректное значения - «СНИЛС»',
    email: { value: generate.email(), message: null },
    lastName: { value: generate.lastName(), message: null },
    firstName: { value: generate.firstName(), message: null },
    middleName: { value: generate.middleName(), message: null },
    SNILS: { value: generate.numberStr(11), message: 'Укажите правильный СНИЛС' },
    INN: { value: generate.INN(true), message: null },
    financing: { value: 'Местный бюджет', message: null },
    personalNumber: { value: generate.numberStr(8), message: null },
    bookNumber: { value: generate.numberStr(8), message: null },
  },
  {
    name: 'Некорректное значения - «ИНН»',
    email: { value: generate.email(), message: null },
    lastName: { value: generate.lastName(), message: null },
    firstName: { value: generate.firstName(), message: null },
    middleName: { value: generate.middleName(), message: null },
    SNILS: { value: generate.SNILS(), message: null },
    INN: { value: generate.numberStr(12), message: 'Укажите правильный ИНН' },
    financing: { value: 'Местный бюджет', message: null },
    personalNumber: { value: generate.numberStr(8), message: null },
    bookNumber: { value: generate.numberStr(8), message: null },
  },
  {
    name: 'Некорректное значения - «Почта»',
    email: { value: generate.word(8), message: 'Укажите правильный адрес электронной почты' },
    lastName: { value: generate.lastName(), message: null },
    firstName: { value: generate.firstName(), message: null },
    middleName: { value: generate.middleName(), message: null },
    SNILS: { value: generate.SNILS(), message: null },
    INN: { value: generate.INN(true), message: null },
    financing: { value: 'Местный бюджет', message: null },
    personalNumber: { value: generate.numberStr(8), message: null },
    bookNumber: { value: generate.numberStr(8), message: null },
  },
  {
    name: 'Только обязательные',
    email: { value: generate.email(), message: null },
    lastName: { value: generate.lastName(), message: null },
    firstName: { value: generate.firstName(), message: null },
    middleName: { value: '', message: null },
    SNILS: { value: generate.SNILS(), message: null },
    INN: { value: generate.INN(true), message: null },
    financing: { value: 'Местный бюджет', message: null },
    personalNumber: { value: '', message: null },
    bookNumber: { value: '', message: null },
  },
  {
    name: 'Только пробелы',
    email: { value: '  ', message: 'Укажите адрес электронной почты' },
    lastName: { value: '   ', message: 'Укажите фамилию' },
    firstName: { value: ' ', message: 'Укажите имя' },
    middleName: { value: generate.middleName(), message: null },
    SNILS: { value: ' ', message: null },
    INN: { value: ' ', message: required() },
    financing: { value: 'Местный бюджет', message: null },
    personalNumber: { value: generate.numberStr(8), message: null },
    bookNumber: { value: generate.numberStr(8), message: null },
  },
  {
    name: 'Граничные значения',
    email: { value: generate.email(), message: null },
    lastName: { value: generate.word(25), message: null },
    firstName: { value: generate.word(25), message: null },
    middleName: { value: generate.word(25), message: null },
    SNILS: { value: generate.SNILS(), message: null },
    INN: { value: generate.INN(true), message: null },
    financing: { value: 'Местный бюджет', message: null },
    personalNumber: { value: generate.word(25), message: null },
    bookNumber: { value: generate.word(25), message: null },
  },
];