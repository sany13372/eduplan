import { maxLengthExceeded, required } from '@utils/validation';

import { DataGenerator } from '../generator.data';
import { DateFormat } from '../model/enums/dateFormat';
import { CommonHelper } from '../../common.helper';

const generate = new DataGenerator();
const helper = new CommonHelper();

export const PERIOD_VALIDATION_DATA = [
  {
    name: 'Обязательные значения - «Вид»',
    kind: { value: '', message: required() },
    title: { value: generate.word(10), message: null },
    startDate: { value: helper.getDateInFormat(generate.date({ month: 1 }), DateFormat.ddMMyyyy), message: null },
    endDate: { value: helper.getDateInFormat(generate.date({ month: 2 }), DateFormat.ddMMyyyy), message: null },
  },
  {
    name: 'Обязательные значения - «Название»',
    kind: { value: 'Период аттестации', message: null },
    title: { value: '', message: required() },
    startDate: { value: helper.getDateInFormat(generate.date({ month: 1 }), DateFormat.ddMMyyyy), message: null },
    endDate: { value: helper.getDateInFormat(generate.date({ month: 2 }), DateFormat.ddMMyyyy), message: null },
  },
  {
    name: 'Обязательные значения - «Дата начала»',
    kind: { value: 'Период аттестации', message: null },
    title: { value: generate.word(10), message: null },
    startDate: { value: '', message: required() },
    endDate: { value: helper.getDateInFormat(generate.date({ month: 2 }), DateFormat.ddMMyyyy), message: null },
  },
  {
    name: 'Обязательные значения - «Дата окончания»',
    kind: { value: 'Период аттестации', message: null },
    title: { value: generate.word(10), message: null },
    startDate: { value: helper.getDateInFormat(generate.date({ month: 1 }), DateFormat.ddMMyyyy), message: null },
    endDate: { value: '', message: null },
  },
  {
    name: 'Запредельные значения',
    kind: { value: 'Период аттестации', message: null },
    title: { value: generate.word(51), message: maxLengthExceeded() },
    startDate: { value: helper.getDateInFormat(generate.date({ month: 1 }), DateFormat.ddMMyyyy), message: null },
    endDate: { value: helper.getDateInFormat(generate.date({ month: 2 }), DateFormat.ddMMyyyy), message: null },
  },
  {
    name: 'Дата начала позже даты окончания',
    kind: { value: 'Период аттестации', message: null },
    title: { value: generate.word(10), message: null },
    startDate: {
      value: helper.getDateInFormat(generate.date({ month: 3 }), DateFormat.ddMMyyyy),
      message: 'Дата начала периода не должна быть позже даты окончания периода',
    },
    endDate: { value: helper.getDateInFormat(generate.date({ month: 1 }), DateFormat.ddMMyyyy), message: null },
  },
  {
    name: 'Некорректная дата начала',
    kind: { value: 'Период аттестации', message: null },
    title: { value: generate.word(10), message: null },
    startDate: { value: generate.numberStr(2), message: required() },
    endDate: { value: helper.getDateInFormat(generate.date({ month: 1 }), DateFormat.ddMMyyyy), message: null },
  },
  {
    name: 'Некорректная дата окончания',
    kind: { value: 'Период аттестации', message: null },
    title: { value: generate.word(10), message: null },
    startDate: { value: helper.getDateInFormat(generate.date({ month: 1 }), DateFormat.ddMMyyyy), message: null },
    endDate: { value: generate.numberStr(2), message: required() },
  },
  {
    name: 'Граничные значения',
    kind: { value: 'Период аттестации', message: null },
    title: { value: generate.word(50), message: null },
    startDate: { value: helper.getDateInFormat(generate.date({ month: 1 }), DateFormat.ddMMyyyy), message: null },
    endDate: { value: helper.getDateInFormat(generate.date({ month: 2 }), DateFormat.ddMMyyyy), message: null },
  },
];
