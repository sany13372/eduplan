import { PeriodAnswer } from '../enum/period.answer.enum';
import { PeriodModel } from '../model/period.model';
import { DateFormat } from '../model/enums/dateFormat';
import { CommonHelper } from '../../common.helper';

const helper = new CommonHelper();

export class EduPlanResponse {
  static readEduPlan(): string | unknown {
    return {
      data: {
        readEduPlan0: {
          spaceId: 'spc_2JUdyVimGrMYSMFUPz2H7pd1ABS',
          eduProgramId: 'epr_2RbnO5m3WxgsF4MMrIAHqa61p3B',
          academicHourDurationSetting: {
            academicHourDuration: {
              minutesAmount: 45,
            },
          },
          doAccountHoursInCreditUnits: true,
          academicHoursInCreditUnitAmount: 36.0,
          doAccountHoursInAcademicHours: true,
          deletedAt: null,
        },
      },
    };
  }

  static readEduPlans(): string | unknown {
    return {
      data: {
        readEduPlans0: [
          {
            __typename: 'EduPlan',
            spaceId: 'spc_2JUdyVimGrMYSMFUPz2H7pd1ABS',
            id: 'epl_2Uf7DobLJMAtF6kgL8vZvZZS727',
            title: 'Разработка и запуск EdTech-продуктов',
            shortTitle: 'EdTech',
            eduFormSetting: {
              eduForm: {
                id: 'edf_2EXNoF39Dy9KrYwm42qMDUqj2g1',
                title: 'Очная форма',
                shortTitle: 'Очная',
              },
            },
            eduTechnologySetting: {
              eduTechnology: {
                id: 'edt_2EXNoM9bWF6rofFPE5QwSGl6JrU',
                title: 'Дистанционные технологии',
                shortTitle: 'Дистанционная',
              },
            },
            completionPeriodSetting: {
              completionPeriod: {
                id: 'ecp_2Uf6jXEltiiEYej3wc5A3Ab1sc3',
                title: '1 год',
              },
            },
            eduGridSetting: {
              eduGrid: {
                id: 'edg_2Uf6s2GGjZwD3pBBfnCeESlBla6',
                title: '1 год, 2 семестра',
                completionPeriodId: 'ecp_2Uf6jXEltiiEYej3wc5A3Ab1sc3',
              },
            },
            eduProgram: {
              id: 'epr_2PhSpUW31E5cYhQw8pGH28MbCug',
              title: 'Разработка и запуск EdTech-продуктов',
              eduLevelSetting: {
                eduLevel: {
                  eduKind: {
                    systemCode: 'pro',
                  },
                },
              },
              eduProgramKindSetting: {
                eduProgramKind: {
                  id: 'epk_2EXNnhNvlxcLcj25yzSvKWNYB8g',
                  title: 'Программа магистратуры',
                },
              },
              domainOfStudySetting: {
                domainOfStudy: {
                  id: 'edos_2PhSaqgcKuLY5by4a74dJdxqP5i',
                  title: 'Управление качеством',
                  systemCode: '27.04.02',
                },
              },
            },
            enrollmentYear: 2023,
            eduStartDate: '2023-09-01',
            doAccountHoursInAcademicHours: true,
            academicHourDurationSetting: {
              academicHourDuration: {
                id: 'ahd_2EXNos93jiKsY4P7XQQ9F2JjSSo',
                title: '45 минут',
              },
            },
            space: {
              id: 'spc_2FJE54OVsHTrUBonhllvWhXk8Ia',
              title: 'СберОбразование - МИСИС - ВО',
            },
            doAccountLessonDuration: true,
            academicHoursInLessonAmount: 2,
            doAccountHoursInCreditUnits: true,
            academicHoursInCreditUnitAmount: 36.0,
          },
        ],
      },
    };
  }

  static readEduPlanRow(): string | unknown {
    return {
      data: {
        readEduPlanRow0: {
          deletedAt: null,
          id: 'eplr_2RvyDUgHPtwyhWb7QYU0HR9HoqK',
          activity: {
            title: '01. Системный подход к принятию решений',
            shortTitle: '01. Системный подход',
            eduPlanRegistryElemCategorySetting: {
              eduPlanRegistryElemCategory: {
                id: 'eplrec_2EXNoQ35Pi8TCtPJl4bxLy23TfA',
                title: 'Дисциплина',
              },
            },
            id: 'epa_2RvyDTlb2Qq0bM65vIPYxk7QzeO',
          },
          eduGridElementItem: { eduGridElementSetting: { eduGridElement: { title: 'Основные курсы' } } },
        },
      },
    };
  }

  static readEduPlanRows(): string | unknown {
    return {
      data: {
        readEduPlanRows0: [
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2UhEn1CWBvfTmKzMd6L6lks2FEU',
            isGroupItem: false,
            activity: {
              id: 'epa_2UhEn0MY4BCa49OBTe6P8VK2pqP',
              title: 'Педагогический дизайн современных образовательных продуктов',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7DqpuOwPhhUWm6MSpo0XINs4',
            path: 'eplr_2UhEn1CWBvfTmKzMd6L6lks2FEU',
            priority: 1024,
            eduPlanRowHours0: [],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2UhFEab6aOAoHVgjaUeBGH465CO',
            isGroupItem: false,
            activity: {
              id: 'epa_2UhFEY6qmsejcK5Ihu0Dq1aK1lE',
              title: 'Разработка технических заданий на программное обеспечение',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7DqpuOwPhhUWm6MSpo0XINs4',
            path: 'eplr_2UhFEab6aOAoHVgjaUeBGH465CO',
            priority: 3072,
            eduPlanRowHours0: [
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNodB4valPJ3gkqyotAzcR6EM',
                minutesAmount: 1620,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNofhYikcIJstDF4J1BCLi2Li',
                minutesAmount: 3240,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNofGjVDpTsO6pnLiVMJWvw2g',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNoeWb6M3SbjvPOW1HdMFjyas',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNoh1nBUGfTkR324QWLS3HT4e',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
            ],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2UhFOKmqrwmDv6GtKz38UYCYW4v',
            isGroupItem: false,
            activity: {
              id: 'epa_2UhFOOSIpDJ1E7uuQ0kVKRefjBv',
              title: 'Управление проектами',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7DqpuOwPhhUWm6MSpo0XINs4',
            path: 'eplr_2UhFOKmqrwmDv6GtKz38UYCYW4v',
            priority: 5120,
            eduPlanRowHours0: [
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNofhYikcIJstDF4J1BCLi2Li',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNofGjVDpTsO6pnLiVMJWvw2g',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNoeWb6M3SbjvPOW1HdMFjyas',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNodB4valPJ3gkqyotAzcR6EM',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNoh1nBUGfTkR324QWLS3HT4e',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
            ],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2UhFZP6sBkG9anujGBzS9lT9HAO',
            isGroupItem: false,
            activity: {
              id: 'epa_2UhFZUx6woM4BoRBA0fJtHmtofh',
              title: 'Педагогический дизайн современных образовательных продуктов',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7Dsc9PZMfPqxCqFkWZFLsxym',
            path: 'eplr_2UhFZP6sBkG9anujGBzS9lT9HAO',
            priority: 3072,
            eduPlanRowHours0: [],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2UhFiBiHRG6tul1kxHQzl9es8jv',
            isGroupItem: false,
            activity: {
              id: 'epa_2UhFiGmPkHKZ9Wg7qnMc82OLMyz',
              title: 'Управление качеством',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7Dsc9PZMfPqxCqFkWZFLsxym',
            path: 'eplr_2UhFiBiHRG6tul1kxHQzl9es8jv',
            priority: 5120,
            eduPlanRowHours0: [],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2UhGo5J2jV68gAJXthi91qy8Fh9',
            isGroupItem: true,
            activity: null,
            activityGroup: {
              id: 'epag_2UhGo2UhxCImbRltuV1Eqpsk4sb',
              title: 'Дисциплины по выбору обучающихся',
              eduPlanComponentKindSetting: {
                eduPlanComponentKindSetting: {
                  systemCode: 'opt-module',
                },
              },
            },
            eduGridElementId: 'egei_2Uf7Dsc9PZMfPqxCqFkWZFLsxym',
            path: 'eplr_2UhGo5J2jV68gAJXthi91qy8Fh9',
            priority: 6144,
            eduPlanRowHours0: [],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2UhGr2Q7hFq0gveagf8eX6z9UBJ',
            isGroupItem: false,
            activity: {
              id: 'epa_2UhGr24ajf3eR1J9HgJRlFRhPu6',
              title: 'UX-дизайн',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7Dsc9PZMfPqxCqFkWZFLsxym',
            path: 'eplr_2UhGo5J2jV68gAJXthi91qy8Fh9.eplr_2UhGr2Q7hFq0gveagf8eX6z9UBJ',
            priority: 1024,
            eduPlanRowHours0: [
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNofhYikcIJstDF4J1BCLi2Li',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNofGjVDpTsO6pnLiVMJWvw2g',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNoeWb6M3SbjvPOW1HdMFjyas',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNodB4valPJ3gkqyotAzcR6EM',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNoh1nBUGfTkR324QWLS3HT4e',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
            ],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2UhH1FNSgufLoilUhdhY1SeCrDV',
            isGroupItem: false,
            activity: {
              id: 'epa_2UhH1HzLRNNwVu2GNVyMnMm1G8Z',
              title: 'Прикладные методы сбора и анализа данных',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7Dsc9PZMfPqxCqFkWZFLsxym',
            path: 'eplr_2UhGo5J2jV68gAJXthi91qy8Fh9.eplr_2UhH1FNSgufLoilUhdhY1SeCrDV',
            priority: 3072,
            eduPlanRowHours0: [],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2UhH4t5p1t0HKLpK5jHsz6k7mdn',
            isGroupItem: false,
            activity: {
              id: 'epa_2UhH4vJRDISczzHtDSu2SIovdDC',
              title: 'Создание веб-ресурсов',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7Dsc9PZMfPqxCqFkWZFLsxym',
            path: 'eplr_2UhGo5J2jV68gAJXthi91qy8Fh9.eplr_2UhH4t5p1t0HKLpK5jHsz6k7mdn',
            priority: 4096,
            eduPlanRowHours0: [],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2UhHFFWP8ciIRRFhKj8qC30vfrk',
            isGroupItem: false,
            activity: {
              id: 'epa_2UhHFEBe6pEZ5ilK5umi0plRf3l',
              title: 'Дистрибуция и монетизация контента',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7Dsc9PZMfPqxCqFkWZFLsxym',
            path: 'eplr_2UhGo5J2jV68gAJXthi91qy8Fh9.eplr_2UhHFFWP8ciIRRFhKj8qC30vfrk',
            priority: 5120,
            eduPlanRowHours0: [],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2UhHKmQMvgU4E2OyqRoLZ6wEXT0',
            isGroupItem: false,
            activity: {
              id: 'epa_2UhHKhyzelVh1CWNjOBXo3Ny0lP',
              title: 'Основы контент-маркетинга',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7Dsc9PZMfPqxCqFkWZFLsxym',
            path: 'eplr_2UhGo5J2jV68gAJXthi91qy8Fh9.eplr_2UhHKmQMvgU4E2OyqRoLZ6wEXT0',
            priority: 6144,
            eduPlanRowHours0: [],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2UhHd9J9dipJyJZDmgNKijYA43k',
            isGroupItem: false,
            activity: {
              id: 'epa_2UhHd9pcO2OAxB4kcJhJbeKs98a',
              title: 'Контент-стратегия и анализ ее эффективности',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7Dsc9PZMfPqxCqFkWZFLsxym',
            path: 'eplr_2UhGo5J2jV68gAJXthi91qy8Fh9.eplr_2UhHd9J9dipJyJZDmgNKijYA43k',
            priority: 7168,
            eduPlanRowHours0: [],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2UhHhm9kJB8HcAPtdTkHM5Qc0bN',
            isGroupItem: false,
            activity: {
              id: 'epa_2UhHhngjxHNjSkS5PObs3msp4qt',
              title: 'Инструменты для создания контента',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7Dsc9PZMfPqxCqFkWZFLsxym',
            path: 'eplr_2UhGo5J2jV68gAJXthi91qy8Fh9.eplr_2UhHhm9kJB8HcAPtdTkHM5Qc0bN',
            priority: 8192,
            eduPlanRowHours0: [],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2UhHwSumRbtviJwSrFPDlwxbTjK',
            isGroupItem: false,
            activity: {
              id: 'epa_2UhHwOw4HsYXiTN7ClT708B8ez5',
              title: 'Дизайн-мышление',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7Dsc9PZMfPqxCqFkWZFLsxym',
            path: 'eplr_2UhGo5J2jV68gAJXthi91qy8Fh9.eplr_2UhHwSumRbtviJwSrFPDlwxbTjK',
            priority: 10240,
            eduPlanRowHours0: [],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2UhI5Fav1emGmiocDK7jox6ppfr',
            isGroupItem: true,
            activity: null,
            activityGroup: {
              id: 'epag_2UhI5EyOqSe7N99fPwnS0kllKB7',
              title: 'Дисциплины по выбору обучающихся',
              eduPlanComponentKindSetting: {
                eduPlanComponentKindSetting: {
                  systemCode: 'opt-module',
                },
              },
            },
            eduGridElementId: 'egei_2Uf7DqpuOwPhhUWm6MSpo0XINs4',
            path: 'eplr_2UhI5Fav1emGmiocDK7jox6ppfr',
            priority: 6144,
            eduPlanRowHours0: [],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2UhIEjQ3bqLBt6cYbROcTh8ualG',
            isGroupItem: false,
            activity: {
              id: 'epa_2UhIEmgbLGB6idO5nuufXTMKyVu',
              title: 'Основы программирования',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7DqpuOwPhhUWm6MSpo0XINs4',
            path: 'eplr_2UhI5Fav1emGmiocDK7jox6ppfr.eplr_2UhIEjQ3bqLBt6cYbROcTh8ualG',
            priority: 1024,
            eduPlanRowHours0: [
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNodB4valPJ3gkqyotAzcR6EM',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNofhYikcIJstDF4J1BCLi2Li',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNofGjVDpTsO6pnLiVMJWvw2g',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNoh1nBUGfTkR324QWLS3HT4e',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNoeWb6M3SbjvPOW1HdMFjyas',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
            ],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2UhILMe086yS5FhUp3EODJb7eTa',
            isGroupItem: false,
            activity: {
              id: 'epa_2UhILN0fb6WPcRMRHg0Ck1dXsDC',
              title: 'Лидерство и управление командой',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7DqpuOwPhhUWm6MSpo0XINs4',
            path: 'eplr_2UhI5Fav1emGmiocDK7jox6ppfr.eplr_2UhILMe086yS5FhUp3EODJb7eTa',
            priority: 2048,
            eduPlanRowHours0: [
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNofhYikcIJstDF4J1BCLi2Li',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNofGjVDpTsO6pnLiVMJWvw2g',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNoeWb6M3SbjvPOW1HdMFjyas',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNodB4valPJ3gkqyotAzcR6EM',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNoh1nBUGfTkR324QWLS3HT4e',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
            ],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2V6YucsFN8qXM5MXiO5mcVr9FGU',
            isGroupItem: false,
            activity: {
              id: 'epa_2V6YucKtU8wBKA9SyrI2Coz45fi',
              title: 'Программирование на Python',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7DqpuOwPhhUWm6MSpo0XINs4',
            path: 'eplr_2UhI5Fav1emGmiocDK7jox6ppfr.eplr_2V6YucsFN8qXM5MXiO5mcVr9FGU',
            priority: 3072,
            eduPlanRowHours0: [
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNofhYikcIJstDF4J1BCLi2Li',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNofGjVDpTsO6pnLiVMJWvw2g',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNoeWb6M3SbjvPOW1HdMFjyas',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNodB4valPJ3gkqyotAzcR6EM',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNoh1nBUGfTkR324QWLS3HT4e',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
            ],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2V6Z6xmwYLPNu4VUmZKL8AwRTwn',
            isGroupItem: false,
            activity: {
              id: 'epa_2V6Z6xfSuyYbI5LS970ffJJkR0a',
              title: 'Визуальный сторителлинг и дизайн',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7DqpuOwPhhUWm6MSpo0XINs4',
            path: 'eplr_2UhI5Fav1emGmiocDK7jox6ppfr.eplr_2V6Z6xmwYLPNu4VUmZKL8AwRTwn',
            priority: 4096,
            eduPlanRowHours0: [
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNofhYikcIJstDF4J1BCLi2Li',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNofGjVDpTsO6pnLiVMJWvw2g',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNoeWb6M3SbjvPOW1HdMFjyas',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNodB4valPJ3gkqyotAzcR6EM',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNoh1nBUGfTkR324QWLS3HT4e',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
            ],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2V2MUyYWxdhjDQ0CgaaiKuEpiW7',
            isGroupItem: false,
            activity: {
              id: 'epa_2V2MUwzHVxGTDsSQkwejxp1SesS',
              title: 'Юридические основы реализации образовательных услуг',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7Dsc9PZMfPqxCqFkWZFLsxym',
            path: 'eplr_2V2MUyYWxdhjDQ0CgaaiKuEpiW7',
            priority: 7168,
            eduPlanRowHours0: [],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2V2MbZuI0MmaCDGiTFjgD8X2lKV',
            isGroupItem: false,
            activity: {
              id: 'epa_2V2MbWiOxfvK25mXCaXXVw9ajQZ',
              title: 'Технологии создания цифрового образовательного контента',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7Dsc9PZMfPqxCqFkWZFLsxym',
            path: 'eplr_2V2MbZuI0MmaCDGiTFjgD8X2lKV',
            priority: 8192,
            eduPlanRowHours0: [],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2V2MikQ4n8GBpl9HRrhjkKamwmi',
            isGroupItem: false,
            activity: {
              id: 'epa_2V2Miknvo9E5TBv59Erd7mygAIj',
              title: 'EdTech-предпринимательство',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7DqpuOwPhhUWm6MSpo0XINs4',
            path: 'eplr_2V2MikQ4n8GBpl9HRrhjkKamwmi',
            priority: 7168,
            eduPlanRowHours0: [],
          },
          {
            __typename: 'EduPlanRow',
            id: 'eplr_2V2N4ZjERCbABHjeXzTRjHPJiFR',
            isGroupItem: false,
            activity: {
              id: 'epa_2V2N4eibA5E24rd2Jh74S5w51nF',
              title: 'Внеучебные мероприятия',
            },
            activityGroup: null,
            eduGridElementId: 'egei_2Uf7DqpuOwPhhUWm6MSpo0XINs4',
            path: 'eplr_2V2N4ZjERCbABHjeXzTRjHPJiFR',
            priority: 8192,
            eduPlanRowHours0: [
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNofhYikcIJstDF4J1BCLi2Li',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNofGjVDpTsO6pnLiVMJWvw2g',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNoeWb6M3SbjvPOW1HdMFjyas',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNodB4valPJ3gkqyotAzcR6EM',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
              {
                __typename: 'EduPlanRowHour',
                lessonKindId: 'lk_2EXNoh1nBUGfTkR324QWLS3HT4e',
                minutesAmount: 0,
                lessonKindSetting: {
                  lessonKind: {
                    lessontType: {
                      eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
                    },
                  },
                },
              },
            ],
          },
        ],
      },
    };
  }

  static readEduPlanActivityRows(): string | unknown {
    return {
      data: {
        readEduPlanActivityRows1: [
          {
            __typename: 'EduPlanActivityRow',
            eduPlanRow: { eduPlanId: 'epl_2Rbp8yoAlOapj6MI7znUemTmVMy' },
            eduPlanRowId: 'eplr_2RvyDUgHPtwyhWb7QYU0HR9HoqK',
          },
        ],
      },
    };
  }

  static getEduProgramAdmins(): string | unknown {
    return {
      data: {
        getEduProgramAdmins0: {
          count: 7,
        },
        getEduProgramAdmins1: {
          entities: [
            {
              __typename: 'EmployeeType',
              id: 'pr_2V71pKg3IyFBHyRnEG1mb62iUcq',
              employeePerson: {
                identityCard: {
                  firstName: 'Маргарита',
                  lastName: 'Дорофеева',
                  middleName: 'Юрьевна',
                },
              },
            },
            {
              __typename: 'EmployeeType',
              id: 'pr_2V71riTHzIUWYXVCkAvq7X1bUrz',
              employeePerson: {
                identityCard: {
                  firstName: 'Андрей',
                  lastName: 'Данилин',
                  middleName: 'Владимирович',
                },
              },
            },
            {
              __typename: 'EmployeeType',
              id: 'pr_2V71ubTLxBKqWz7d5S1GEexjMfh',
              employeePerson: {
                identityCard: {
                  firstName: 'Мария',
                  lastName: 'Котенева',
                  middleName: 'Владимировна',
                },
              },
            },
            {
              __typename: 'EmployeeType',
              id: 'pr_2V71xDhgq59iRZQ50W5ki2XAWPF',
              employeePerson: {
                identityCard: {
                  firstName: 'Алина',
                  lastName: 'Малиновская',
                  middleName: 'Сергеевна',
                },
              },
            },
            {
              __typename: 'EmployeeType',
              id: 'pr_2V71zoDvInnk2dS7JuyJox9UfKc',
              employeePerson: {
                identityCard: {
                  firstName: 'Альбина',
                  lastName: 'Абдулина',
                  middleName: 'Асхатовна',
                },
              },
            },
            {
              __typename: 'EmployeeType',
              id: 'pr_2V7224XdKQ8HnKEQ7B6MjsyZVMf',
              employeePerson: {
                identityCard: {
                  firstName: 'Наталья',
                  lastName: 'Шабалдина',
                  middleName: 'Владимировна',
                },
              },
            },
            {
              __typename: 'EmployeeType',
              id: 'pr_2V724Eg0cA82Bm4mEixFU9Fwjm2',
              employeePerson: {
                identityCard: {
                  firstName: 'Юлия',
                  lastName: 'Барабанова',
                  middleName: 'Александровна',
                },
              },
            },
          ],
        },
      },
    };
  }

  static getAvailableEduProgramAdmins(): string | unknown {
    return { data: { getAvailableEduProgramAdmins0: { count: 9 } } };
  }

  static readEduGridElementItems(): string | unknown {
    return {
      data: {
        readEduGridElementItems0: [
          {
            __typename: 'EduGridElementItem',
            id: 'egei_2Uf7DqpuOwPhhUWm6MSpo0XINs4',
            eduGridElementSetting: {
              eduGridElement: {
                title: '1 семестр',
                gridId: 'edg_2Uf6s2GGjZwD3pBBfnCeESlBla6',
                priority: null,
              },
            },
          },
          {
            __typename: 'EduGridElementItem',
            id: 'egei_2Uf7Dsc9PZMfPqxCqFkWZFLsxym',
            eduGridElementSetting: {
              eduGridElement: {
                title: '2 семестр',
                gridId: 'edg_2Uf6s2GGjZwD3pBBfnCeESlBla6',
                priority: null,
              },
            },
          },
        ],
      },
    };
  }

  static readEduProgram(): string | unknown {
    return { data: { readEduProgram0: { spaceId: 'spc_2JUdyVimGrMYSMFUPz2H7pd1ABS' } } };
  }

  static readEduWorkKindSettings(): string | unknown {
    return {
      data: {
        readEduWorkKindSettings0: [
          {
            __typename: 'EduWorkKindSetting',
            itemId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
            eduWorkKind: {
              systemCode: 'classroom-work',
              title: 'Аудиторная работа',
              shortTitle: 'ауд.раб.',
              priority: null,
            },
          },
          {
            __typename: 'EduWorkKindSetting',
            itemId: 'edwk_2EXNoZRmSqvhWPuvS7g2NWeSKcT',
            eduWorkKind: {
              systemCode: 'extracurricular-work',
              title: 'Внеаудиторная работа',
              shortTitle: 'внеауд.раб.',
              priority: null,
            },
          },
          {
            __typename: 'EduWorkKindSetting',
            itemId: 'edwk_2EXNoZIHyhqQmR5L1BcqUnLXVXh',
            eduWorkKind: {
              systemCode: 'electronic-work',
              title: 'Работа в электронной информационно-образовательной среде',
              shortTitle: 'раб. в ЭИОС',
              priority: null,
            },
          },
          {
            __typename: 'EduWorkKindSetting',
            itemId: 'edwk_2EXNofGjVDpTsO6pnLiVMJWvw2g',
            eduWorkKind: {
              systemCode: 'independent-work',
              title: 'Самостоятельная работа обучающихся',
              shortTitle: 'сам.раб.',
              priority: null,
            },
          },
          {
            __typename: 'EduWorkKindSetting',
            itemId: 'edwk_2EXNod8nMJTvc9LRwLPQSoLmkKK',
            eduWorkKind: {
              systemCode: 'control',
              title: 'Контроль знаний обучающихся',
              shortTitle: 'контр.знан.',
              priority: null,
            },
          },
        ],
        readLessonTypeSettings0: [
          {
            __typename: 'LessonTypeSetting',
            itemId: 'lt_2EXNohGlq6ifQLbBhgjP6utzzjZ',
            lessonType: {
              systemCode: 'lecture',
              title: 'Лекционные занятия',
              shortTitle: 'лекц.зан.',
              priority: null,
              eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
            },
          },
          {
            __typename: 'LessonTypeSetting',
            itemId: 'lt_2EXNoaq1Ux5rhCFVz0Hvz4wJHzR',
            lessonType: {
              systemCode: 'seminar',
              title: 'Семинарские занятия',
              shortTitle: 'сем.зан.',
              priority: null,
              eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
            },
          },
          {
            __typename: 'LessonTypeSetting',
            itemId: 'lt_2EXNoZiMCZazFjfH0JznnoBfdUO',
            lessonType: {
              systemCode: 'independent-work-control',
              title: 'Контроль самостоятельной работы',
              shortTitle: 'контроль сам.раб.',
              priority: null,
              eduWorkKindId: 'edwk_2EXNoa2MPhDiZgC2AUAtBaN0hVX',
            },
          },
          {
            __typename: 'LessonTypeSetting',
            itemId: 'lt_2EXNoe9e2I6OJZ301BZ2K7Pbae7',
            lessonType: {
              systemCode: 'independent-work',
              title: 'Самостоятельная работа',
              shortTitle: 'сам.раб.',
              priority: null,
              eduWorkKindId: 'edwk_2EXNofGjVDpTsO6pnLiVMJWvw2g',
            },
          },
          {
            __typename: 'LessonTypeSetting',
            itemId: 'lt_2EXNoaC9t3AIbbVmXevcCfAVZhJ',
            lessonType: {
              systemCode: 'control',
              title: 'Контроль знаний',
              shortTitle: 'контр.знан.',
              priority: null,
              eduWorkKindId: 'edwk_2EXNod8nMJTvc9LRwLPQSoLmkKK',
            },
          },
        ],
        readLessonKindSettings0: [
          {
            __typename: 'LessonKindSetting',
            lessonKind: {
              deletedAt: null,
              systemCode: 'lecture',
              title: 'Лекция',
              shortTitle: 'Л',
              priority: null,
              lessonTypeId: 'lt_2EXNohGlq6ifQLbBhgjP6utzzjZ',
            },
            itemId: 'lk_2EXNodB4valPJ3gkqyotAzcR6EM',
          },
          {
            __typename: 'LessonKindSetting',
            lessonKind: {
              deletedAt: null,
              systemCode: 'practice',
              title: 'Практическое занятие',
              shortTitle: 'ПЗ',
              priority: null,
              lessonTypeId: 'lt_2EXNoaq1Ux5rhCFVz0Hvz4wJHzR',
            },
            itemId: 'lk_2EXNoeWb6M3SbjvPOW1HdMFjyas',
          },
          {
            __typename: 'LessonKindSetting',
            lessonKind: {
              deletedAt: null,
              systemCode: 'laboratory-work',
              title: 'Лабораторная работа',
              shortTitle: 'ЛР',
              priority: null,
              lessonTypeId: 'lt_2EXNoaq1Ux5rhCFVz0Hvz4wJHzR',
            },
            itemId: 'lk_2EXNoh1nBUGfTkR324QWLS3HT4e',
          },
          {
            __typename: 'LessonKindSetting',
            lessonKind: {
              deletedAt: null,
              systemCode: 'independent-work',
              title: 'Самостоятельная работа',
              shortTitle: 'СР',
              priority: null,
              lessonTypeId: 'lt_2EXNoe9e2I6OJZ301BZ2K7Pbae7',
            },
            itemId: 'lk_2EXNofhYikcIJstDF4J1BCLi2Li',
          },
        ],
      },
    };
  }

  static getEduPlanGridElementPeriods(answer: PeriodAnswer, model: PeriodModel): string | unknown {
    switch (answer) {
      default:
        return {
          data: {
            getEduPlanGridElementPeriods0: {
              periods: [
                {
                  __typename: 'EduGridElementItemPeriodType',
                  id: 'egeip_2VQkWikM5GvSMCRDSAceJPIwd5z',
                  title: 'Обучение по третьему триместру',
                  beginDate: '2024-03-01',
                  endDate: '2024-05-31',
                  periodKind: {
                    id: 'eppk_2N308en9dHJX5k5JeNKdMrcSBDe',
                    title: 'Период обучения',
                  },
                },
                {
                  __typename: 'EduGridElementItemPeriodType',
                  id: 'egeip_2VQkIefscObrPAgPCxQKSqAiBvS',
                  title: 'Обучение по первому триместру',
                  beginDate: '2024-09-01',
                  endDate: '2024-11-30',
                  periodKind: {
                    id: 'eppk_2N308en9dHJX5k5JeNKdMrcSBDe',
                    title: 'Период обучения',
                  },
                },
                {
                  __typename: 'EduGridElementItemPeriodType',
                  id: 'egeip_2VQkSHmDnCtpExkJCDn1kvi7TvW',
                  title: 'Обучение по второму триместру',
                  beginDate: '2024-12-01',
                  endDate: '2025-02-28',
                  periodKind: {
                    id: 'eppk_2N308en9dHJX5k5JeNKdMrcSBDe',
                    title: 'Период обучения',
                  },
                },
                {
                  __typename: 'EduGridElementItemPeriodType',
                  id: 'egeip_2VQbl0kg6izWw9JaFNNj1IYeDKt',
                  title: `${model.title}`,
                  beginDate: `${helper.getDateInFormat(model.startDate, DateFormat.yyyyMMdd)}`,
                  endDate: `${helper.getDateInFormat(model.endDate, DateFormat.yyyyMMdd)}`,
                  periodKind: {
                    id: 'eppk_2N308h61I4HAJkUpVQNWrmYvR41',
                    title: `${model.type}`,
                  },
                },
                {
                  __typename: 'EduGridElementItemPeriodType',
                  id: 'egeip_2VQkeDbl3X0MbmRNfbB20fI5TV1',
                  title: 'Выпускная квалификационная (дипломная) работа (ВКР',
                  beginDate: '2024-05-20',
                  endDate: '2024-05-31',
                  periodKind: {
                    id: 'eppk_2N308eQGLKpuaNiHPmvaPqK3soC',
                    title: 'Период аттестации',
                  },
                },
              ],
            },
          },
        };
      case PeriodAnswer.WITHOUT_PERIOD:
        return { data: { getEduPlanGridElementPeriods0: { periods: [] } } };
    }
  }

  static getAllEduPlanPeriodKinds(): string | unknown {
    return {
      data: {
        getAllEduPlanPeriodKinds: [
          {
            __typename: 'EduPlanPeriodKindType',
            id: 'eppk_2NQb37DF4BQzZyzlCRvugNy8sKO',
            title: 'Период каникул',
          },
          {
            __typename: 'EduPlanPeriodKindType',
            id: 'eppk_2NQb37cQrb3zVU44mw6p61J24m7',
            title: 'Период обучения',
          },
          {
            __typename: 'EduPlanPeriodKindType',
            id: 'eppk_2NQb35Ta0pLAeNGAl16IAP4SjMg',
            title: 'Период аттестации',
          },
          {
            __typename: 'EduPlanPeriodKindType',
            id: 'eppk_2TUGIlBDym5ki33DtZGW2mnIxrg',
            title: 'Период действия подписки',
          },
        ],
      },
    };
  }

  static addEduPlanGridElementPeriod(answer: PeriodAnswer): string | unknown {
    switch (answer) {
      default:
        return {
          data: {
            addEduPlanGridElementPeriod0: {
              id: 'egeip_2VQbl0kg6izWw9JaFNNj1IYeDKt',
            },
          },
        };
      case PeriodAnswer.PERIOD_EARLIER:
        return {
          data: null,
          errors: [
            {
              extensions: {
                code: 'period-earlier-edu-plan-start',
                exception: 'ru.sbereducation.sberuniverse.lambda.eduplan.exception.PeriodEarlierEduPlanStartException',
              },
              locations: [
                {
                  column: 57,
                  line: 1,
                },
              ],
              message: 'Дата начала периода раньше даты начала плана обучения.',
              path: ['addEduPlanGridElementPeriod0'],
            },
          ],
        };
      case PeriodAnswer.PERIOD_EXIST:
        return {
          data: null,
          errors: [
            {
              extensions: {
                code: 'period-exist',
                exception: 'ru.sbereducation.sberuniverse.lambda.eduplan.exception.PeriodExistException',
              },
              locations: [
                {
                  column: 57,
                  line: 1,
                },
              ],
              message: 'Период с таким названием для части плана обучения уже существует.',
              path: ['addEduPlanGridElementPeriod0'],
            },
          ],
        };
    }
  }

  static editEduPlanGridElementPeriod(answer: PeriodAnswer): string | unknown {
    switch (answer) {
      default:
        return {
          data: {
            editEduPlanGridElementPeriod0: {
              id: 'egeip_2VQbl0kg6izWw9JaFNNj1IYeDKt',
            },
          },
        };
      case PeriodAnswer.PERIOD_EARLIER:
        return {
          data: null,
          errors: [
            {
              extensions: {
                code: 'period-earlier-edu-plan-start',
                exception: 'ru.sbereducation.sberuniverse.lambda.eduplan.exception.PeriodEarlierEduPlanStartException',
              },
              locations: [
                {
                  column: 57,
                  line: 1,
                },
              ],
              message: 'Дата начала периода раньше даты начала плана обучения.',
              path: ['editEduPlanGridElementPeriod0'],
            },
          ],
        };
      case PeriodAnswer.PERIOD_EXIST:
        return {
          data: null,
          errors: [
            {
              extensions: {
                code: 'period-exist',
                exception: 'ru.sbereducation.sberuniverse.lambda.eduplan.exception.PeriodExistException',
              },
              locations: [
                {
                  column: 57,
                  line: 1,
                },
              ],
              message: 'Период с таким названием для части плана обучения уже существует.',
              path: ['editEduPlanGridElementPeriod0'],
            },
          ],
        };
    }
  }

  static removeEduPlanGridElementPeriod(): string | unknown {
    return {
      data: {
        removeEduPlanGridElementPeriod0: {
          id: 'egeip_2VQbl0kg6izWw9JaFNNj1IYeDKt',
        },
      },
    };
  }
}
