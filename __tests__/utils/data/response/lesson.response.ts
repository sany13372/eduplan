import { LessonAnswer } from '../enum/lesson.answer.enum';
import { LessonModel } from '../model/lesson.model';
import { ThemeModel } from '../model/theme.model';

export class LessonResponse {
  static getEduPlanRowThemeWithLessonsList(
    answer: LessonAnswer,
    lessonModel: LessonModel,
    themeModel: ThemeModel,
  ): string | unknown {
    switch (answer) {
      default:
        return null;
      case LessonAnswer.SUCCESS:
        return {
          data: {
            getEduPlanRowThemeWithLessonsList0: [
              {
                __typename: 'ActivityThemeWrapperType',
                theme: {
                  themeId: 'epap_2RvzfAqBtpEgqtXVaF74W4WEt9j',
                  rowId: 'epar_2RvzfE0id25C8djarNm2lTu20AH',
                  title: `${themeModel.title}`,
                  lessonsCount: 1,
                },
                lessonWrappers: [
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2SWLQ9bR5DzDxbB6QEh2QxaguUV',
                      title: `${lessonModel.title}`,
                      lessonKind: { title: `${lessonModel.kind.title}`, isScorm: true },
                      isContentAdded: lessonModel.isContentAdded,
                      isAllowRegistration: lessonModel.isAllowRegistration,
                    },
                  },
                ],
              },
              {
                __typename: 'ActivityThemeWrapperType',
                theme: {
                  themeId: 'epap_2Rvzq0I3oRoYvAgN68QOh4PWPi6',
                  rowId: 'epar_2RvzpxUUbJ2fIx4Q8Uu5J6XL2fE',
                  title: 'Тема 02. Анализ, синтез и логика',
                  lessonsCount: 7,
                },
                lessonWrappers: [
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Rw0XDMUrOJvZ55oAIDFL8GQQwm',
                      title: 'Занятие 1. Логика как старт к развитию критического мышления',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Rw0l1KB4uC7C9pEKMBRJJzdb2S',
                      title: 'Занятие 2. Какими бывают суждения',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: false,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Rw0q9OH27PEDtwbXFO7AJtL7uZ',
                      title: 'Занятие 3. Как формируются умозаключения',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Rw1UK20wqKszJlYh85UmPM8cmP',
                      title: 'Занятие 5. Как связаны язык и логика',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: false,
                      isAllowRegistration: false,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Rw1mh5z2O8uijkVrhk6rGRmFMm',
                      title: 'Занятие 6. Язык и логика. Дополнительное чтение',
                      lessonKind: { title: 'Самостоятельная работа', isScorm: false },
                      isContentAdded: false,
                      isAllowRegistration: false,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Rxr6WvagSusH4h1aiohvgDLqQm',
                      title: 'Занятие 7. Итоговый тест по теме',
                      lessonKind: { title: 'Контроль', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2SCstfeC9W4EBEGzJHORzVOF998',
                      title: 'Занятие 4. Тест',
                      lessonKind: { title: 'Контроль', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                ],
              },
              {
                __typename: 'ActivityThemeWrapperType',
                theme: {
                  themeId: 'epap_2RvzvZE0bowe1DQubH2A9xqnAIR',
                  rowId: 'epar_2RvzvZTANJEWVUUznEcJ9ro09QT',
                  title: 'Тема 03. Как избежать ошибок при принятии решений',
                  lessonsCount: 7,
                },
                lessonWrappers: [
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry250aYvGkAPPNvDkSFH03kgFn',
                      title: 'Занятие 1. Что такое когнитивные искажения',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry29NnDxAewY3Fyxc7hIx7Dql3',
                      title: 'Занятие 2. Как противостоять когнитивным искажениям',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry2BjbaUAylWZWWeUI34uPBAiM',
                      title: 'Занятие 3.  Тест',
                      lessonKind: { title: 'Контроль', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry2EoJVg3LQFz09AxfjaU99CDf',
                      title: 'Занятие 4. Как противостоять когнитивным искажениям',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry2H4Jgji85Cg58Bb8zBLxgsD1',
                      title: 'Занятие 5. Как развивать когнитивную гибкость',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry2JHQUuxUiqaUFneJolSp2cKV',
                      title: 'Занятие 6. Как развивать когнитивную гибкость. Дополнительное чтение',
                      lessonKind: { title: 'Самостоятельная работа', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry2MsVfCJNrzcWydC4bfpOGtiP',
                      title: 'Занятие 7. Итоговый тест по теме',
                      lessonKind: { title: 'Контроль', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                ],
              },
              {
                __typename: 'ActivityThemeWrapperType',
                theme: {
                  themeId: 'epap_2RvzzcNAQ0ebiSU4EGpE2thpW6w',
                  rowId: 'epar_2RvzzhtScroUnTG4cnbuheyXfiY',
                  title: 'Тема 04. Системное мышление в бизнесе',
                  lessonsCount: 13,
                },
                lessonWrappers: [
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry5f5mXHaE1wD2nxPrdpScvf8i',
                      title: 'Занятие 01. Понятие системы. Системное мышление',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry5gmk5QYgMiZeVVGgMBhGwKkT',
                      title: 'Занятие 02. Польза системного мышления в жизни и в бизнесе',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry5i8uSHV6OXDclAIBYtI0Nukt',
                      title: 'Занятие 03. Что значит системно мыслить',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry5jSFr8fov9xq7kc5ex1usPZi',
                      title: 'Занятие 04.  Тест',
                      lessonKind: { title: 'Контроль', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry5lCZqoNC8TGTagXqM4NmULh6',
                      title: 'Занятие 05. Способы развития системного мышления',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry5mUTIpm7EeKfvtzlaIDSS0nj',
                      title: 'Занятие 06. Способы развития системного мышления. Дополнительное чтение',
                      lessonKind: { title: 'Самостоятельная работа', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry5nxyc38ca8YE5FUkmjNDV8Uv',
                      title: 'Занятия 07. Ментальные модели и причинно-следственные связи',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry5pAd4iv3QGlbMIwREJPJdINv',
                      title: 'Занятие 08. Принятие решений в системном подходе',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry5qZk6i1QlMumYh8Jp7MSh1L8',
                      title: 'Занятие 09. Матрицы принятия решений',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry5s59L2Ez9LNQJq9uHQ5DJpYi',
                      title: 'Занятие 10. Как быть проактивным. Проактивное мышление и навыки',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry5toN7YASJvXaFVZ08yMSNvtl',
                      title: 'Занятие 11. Заключение',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry5vJu3VhEMqg5PsajVmuOHPTY',
                      title: 'Занятие 13. Итоговый тест по теме',
                      lessonKind: { title: 'Контроль', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2Ry8IJzYBd6mr1QBA9fYTat2Qin',
                      title: 'Занятие 12. Cамостоятельная работа, оценка peer-to-peer',
                      lessonKind: { title: 'Самостоятельная работа', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                ],
              },
              {
                __typename: 'ActivityThemeWrapperType',
                theme: {
                  themeId: 'epap_2Rw03W4mHLyTzgaNkITdf5mJRTR',
                  rowId: 'epar_2Rw03TjBuuaP44gXOXC6aazDFF1',
                  title: 'Тема 05. Стратегическое мышление',
                  lessonsCount: 6,
                },
                lessonWrappers: [
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2RyNA85WmfsAvA7vKIlRdr45ruv',
                      title: 'Занятие 1. Почему стратегическое мышление нужно каждому',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2RyNBZC20ZRioHvNkKsFKfND6ip',
                      title: 'Занятие 2. Как развивать стратегическое мышление',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2RyNCxgcRTXkqoreloFOwOwuZLN',
                      title: 'Занятие 3. Как разрабатывается стратегическая карта',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2RyNEIMQnxltg1rZ2gINoHx2V7g',
                      title: 'Занятие 4. Разработка стратегической канвы',
                      lessonKind: { title: 'Обучение', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2RyNIXwpz2KqsWKlG9fFdvSVXaL',
                      title: 'Занятие 5. Самостоятельная работа, оценка peer-to-peer',
                      lessonKind: { title: 'Самостоятельная работа', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                  {
                    __typename: 'ActivityLessonWrapperType',
                    lesson: {
                      lessonId: 'elsn_2RyNJfI2Oxtt57Lb1Slna7Izfus',
                      title: 'Занятие 6. Итоговый тест по теме',
                      lessonKind: { title: 'Контроль', isScorm: true },
                      isContentAdded: true,
                      isAllowRegistration: true,
                    },
                  },
                ],
              },
              {
                __typename: 'ActivityThemeWrapperType',
                theme: {
                  themeId: 'epap_2Rw07HB4yKnLp34xAp3AIU3hTeN',
                  rowId: 'epar_2Rw07Iyzq4hNn47YOxnm3qMrtJo',
                  title: 'Тема 06. Критическое мышление',
                  lessonsCount: 0,
                },
                lessonWrappers: [],
              },
            ],
          },
        };
      case LessonAnswer.WITHOUT_THEMES:
        return { data: { getEduPlanRowThemeWithLessonsList0: [] } };
      case LessonAnswer.WITHOUT_LESSONS:
        return {
          data: {
            getEduPlanRowThemeWithLessonsList0: [
              {
                __typename: 'ActivityThemeWrapperType',
                theme: {
                  themeId: 'epap_2SWQokW3j4pWFvfcnGuFj8kFt5L',
                  rowId: 'epar_2SWQonhFrmwMycavJXrZw7xrm6n',
                  title: `${themeModel.title}`,
                  lessonsCount: 0,
                },
                lessonWrappers: [],
              },
            ],
          },
        };
    }
  }

  static readThemeLessonKindSettings(): string | unknown {
    return {
      data: {
        readThemeLessonKindSettings0: [
          {
            __typename: 'ThemeLessonKindSetting',
            themeLessonKind: { id: 'tlk_2EXNpA2MnPxFPneXr9zRZGkucKn', title: 'Обучение' },
          },
          {
            __typename: 'ThemeLessonKindSetting',
            themeLessonKind: { id: 'tlk_2EXNpBrJ2b73mB5dVyuWVvr4SKo', title: 'Самостоятельная работа' },
          },
          {
            __typename: 'ThemeLessonKindSetting',
            themeLessonKind: { id: 'tlk_2EXNpFkV0gnrwEnRKn705KVYKTE', title: 'Контроль' },
          },
          {
            __typename: 'ThemeLessonKindSetting',
            themeLessonKind: { id: 'tlk_2PdlJQbUMexY1hIRZ1ZTWT5OfHA', title: 'Домашнее задание' },
          },
        ],
      },
    };
  }

  static addEduLesson(): string | unknown {
    return { data: { addEduLesson0: { id: 'elsn_2SWLQ9bR5DzDxbB6QEh2QxaguUV' } } };
  }

  static editEduLesson(answer: LessonAnswer): string | unknown {
    switch (answer) {
      default:
        return null;
      case LessonAnswer.SUCCESS:
        return { data: { editEduLesson0: { id: 'elsn_2SWLQ9bR5DzDxbB6QEh2QxaguUV' } } };
      case LessonAnswer.LESSON_STREAM_IS_RUNNING:
        return {
          data: null,
          errors: [
            {
              extensions: {
                code: 'USER_UNCHECKED_GRAPHQL_ERROR',
                exception:
                  'ru.sbereducation.sberuniverse.lambda.share.exception.unchecked.UserUncheckedGraphQLException',
              },
              locations: [{ column: 58, line: 1 }],
              message:
                'Чтобы отменить согласование занятия, необходимо снять его с публикации. Перейдите в «Настройки обучения» и нажмите на кнопку «Снять с публикации»',
              path: ['editEduLesson0'],
            },
          ],
        };
    }
  }

  static removeEduLesson(answer: LessonAnswer): string | unknown {
    switch (answer) {
      default:
        return null;
      case LessonAnswer.SUCCESS:
        return { data: { removeEduLesson0: { id: 'elsn_2SWLQ9bR5DzDxbB6QEh2QxaguUV' } } };
      case LessonAnswer.LESSON_WITH_STUDENTS:
        return {
          data: null,
          errors: [
            {
              extensions: {
                code: 'USER_UNCHECKED_GRAPHQL_ERROR',
                exception:
                  'ru.sbereducation.sberuniverse.lambda.share.exception.unchecked.UserUncheckedGraphQLException',
              },
              locations: [{ column: 60, line: 1 }],
              message:
                'Чтобы удалить занятие, перейдите в «Настройки обучения» и отмените запись обучающихся на занятие',
              path: ['removeEduLesson0'],
            },
          ],
        };
    }
  }

  static readEduLessons(lessonModel: LessonModel): string | unknown {
    return {
      data: {
        readEduLessons0: [
          {
            __typename: 'EduLesson',
            id: 'elsn_2SWLQ9bR5DzDxbB6QEh2QxaguUV',
            title: `${lessonModel.title}`,
            kind: {
              themeLessonKind: {
                id: 'tlk_2EXNpA2MnPxFPneXr9zRZGkucKn',
                title: `${lessonModel.kind.title}`,
              },
            },
          },
        ],
      },
    };
  }
}
