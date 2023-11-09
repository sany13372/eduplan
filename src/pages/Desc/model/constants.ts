import { EduPlanDesc, ServiceInfo } from '@src/pages/Desc/model/types';

export const emptyEduPlanDescription: EduPlanDesc = {
  id: '',
};

export const defaultEduPlanDescription: EduPlanDesc = {
  id: '',
  b2b: {
    isPubl: false,
    description: '',
    target: '',
    result: '',
    price: '',
    url: '',
    priority: '',
  },
  b2c: {
    isPubl: false,
    description: '',
    target: '',
    result: '',
    price: '',
    url: '',
    priority: '',
  },
};

export const info: ServiceInfo = {
  b2c: {
    title: 'Описание для витрины B2C',
    desc: 'Данные будут использованы для карточки программы в каталоге высшего образования или дополнительного профессионального образования (в зависимости от вида образовательной программы)',
  },
  b2b: {
    title: 'Описание для витрины B2B',
    desc: 'Данные будут использованы для карточки программы в каталоге корпоративного обучения',
  },
};
