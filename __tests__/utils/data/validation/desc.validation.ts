import { maxLengthExceeded } from '@utils/validation';

import { DataGenerator } from '../generator.data';

const generate = new DataGenerator();

export const DESC_VALIDATION_DATA = [
  {
    name: 'Запредельные значения B2C',
    b2cDescription: { value: generate.word(65001), message: maxLengthExceeded() },
    b2cTarget: { value: generate.word(65001), message: maxLengthExceeded() },
    b2cResult: { value: generate.word(65001), message: maxLengthExceeded() },
    b2cUrl: { value: generate.word(513), message: maxLengthExceeded() },
    b2cLanding: { value: generate.word(513), message: maxLengthExceeded() },
    b2cPrice: { value: generate.word(31), message: maxLengthExceeded() },
    b2bDescription: { value: '', message: null },
    b2bTarget: { value: '', message: null },
    b2bResult: { value: '', message: null },
    b2bLanding: { value: '', message: null },
    b2bPrice: { value: '', message: null },
  },
  {
    name: 'Запредельные значения B2B',
    b2cDescription: { value: '', message: null },
    b2cTarget: { value: '', message: null },
    b2cResult: { value: '', message: null },
    b2cUrl: { value: '', message: null },
    b2cLanding: { value: '', message: null },
    b2cPrice: { value: '', message: null },
    b2bDescription: { value: generate.word(65001), message: maxLengthExceeded() },
    b2bTarget: { value: generate.word(65001), message: maxLengthExceeded() },
    b2bResult: { value: generate.word(65001), message: maxLengthExceeded() },
    b2bLanding: { value: generate.word(513), message: maxLengthExceeded() },
    b2bPrice: { value: generate.word(31), message: maxLengthExceeded() },
  },
  {
    name: 'Граничные значения',
    b2cDescription: { value: generate.word(65000), message: null },
    b2cTarget: { value: generate.word(65000), message: null },
    b2cResult: { value: generate.word(65000), message: null },
    b2cUrl: { value: generate.word(512), message: null },
    b2cLanding: { value: generate.word(512), message: null },
    b2cPrice: { value: generate.word(30), message: null },
    b2bDescription: { value: generate.word(65000), message: null },
    b2bTarget: { value: generate.word(65000), message: null },
    b2bResult: { value: generate.word(65000), message: null },
    b2bLanding: { value: generate.word(512), message: null },
    b2bPrice: { value: generate.word(30), message: null },
  },
];
