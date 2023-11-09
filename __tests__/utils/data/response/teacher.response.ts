import { TeacherAnswer } from '../enum/teacher.answer.enum';
import { ActivityModel } from '../model/activity.model';
import { EmployeeModel } from '../model/employee.model';

export class TeacherResponse {
  static removeActivityEmployee(): string | unknown {
    return { data: { removeActivityEmployee0: { employeeId: 'pr_2NN3QWBarBzVErD6r4fuAyg0bmD' } } };
  }

  static getEduPlanEmployeeActivities(
    answer: TeacherAnswer,
    activity: ActivityModel,
    employee: EmployeeModel,
  ): string | unknown {
    switch (answer) {
      default:
        return {
          data: {
            getEduPlanEmployeeActivities0: [
              {
                __typename: 'EduGridWithActivitiesType',
                id: 'edge_2Ff54M9M3SDlRhMY1iH5ktzV1gv',
                title: '1 семестр',
                eduPlanActivities: [
                  {
                    __typename: 'EduPlanActivityType',
                    id: 'epa_2NMqVMuvqeOXXajwqTw17AxIXMt',
                    title: `${activity.title}`,
                    activityEmployees: [],
                  },
                  {
                    __typename: 'EduPlanActivityType',
                    id: 'epa_2NMqa6CHw8zPIczWYaKcDmuTnjC',
                    title: 'Изучение языка программирования Java',
                    activityEmployees: [],
                  },
                ],
              },
              {
                __typename: 'EduGridWithActivitiesType',
                id: 'edge_2Ff54IqjfDZzuvR93BASsXdlm0B',
                title: '2 семестр',
                eduPlanActivities: [
                  {
                    __typename: 'EduPlanActivityType',
                    id: 'epa_2NMqlt49B3QvXmRC6yCsABtcN8d',
                    title: 'Изучение языка программирования Python',
                    activityEmployees: [],
                  },
                  {
                    __typename: 'EduPlanActivityType',
                    id: 'epa_2NMqerjDya8tLc4xNBIKOq3b9sZ',
                    title: 'Погружение нанотехнологии',
                    activityEmployees: [],
                  },
                ],
              },
              {
                __typename: 'EduGridWithActivitiesType',
                id: 'edge_2Ff54JbdUqN8cZ4mY0g5rjvaevf',
                title: '3 семестр',
                eduPlanActivities: [
                  {
                    __typename: 'EduPlanActivityType',
                    id: 'epa_2NMqutOhoMrMaVot11n8dsrcNiR',
                    title: 'Архитектура современного приложения',
                    activityEmployees: [],
                  },
                ],
              },
              {
                __typename: 'EduGridWithActivitiesType',
                id: 'edge_2Ff54P0Q2OIRzYRfq9h0Mo5SyEb',
                title: '4 семестр',
                eduPlanActivities: [
                  {
                    __typename: 'EduPlanActivityType',
                    id: 'epa_2NMr2oSiT8RvveLTh291ngnmAAC',
                    title: 'Выпуская квалификационная работа',
                    activityEmployees: [],
                  },
                  {
                    __typename: 'EduPlanActivityType',
                    id: 'epa_2NMqzblBbYbSc63uBCEvm5e8xR6',
                    title: 'Практика в IT компании',
                    activityEmployees: [],
                  },
                ],
              },
            ],
          },
        };
      case TeacherAnswer.WITH_DESIGNATED_TEACHERS:
        return {
          data: {
            getEduPlanEmployeeActivities0: [
              {
                __typename: 'EduGridWithActivitiesType',
                id: 'edge_2Ff54M9M3SDlRhMY1iH5ktzV1gv',
                title: '1 семестр',
                eduPlanActivities: [
                  {
                    __typename: 'EduPlanActivityType',
                    id: 'epa_2NMqVMuvqeOXXajwqTw17AxIXMt',
                    title: `${activity.title}`,
                    activityEmployees: [
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NN3QWBarBzVErD6r4fuAyg0bmD',
                          employeePerson: {
                            user: { email: `${employee.email}` },
                            identityCard: {
                              firstName: `${employee.firstName}`,
                              lastName: `${employee.lastName}`,
                              middleName: `${employee.middleName}`,
                            },
                          },
                          tenant: {
                            id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY',
                            shortTitle: 'Пром',
                            title: 'ИП СнабСбытСбыт',
                          },
                        },
                      },
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NN3Ibruz9M3vN6xX29dUYmi0L4',
                          employeePerson: {
                            user: { email: 'staff0005@sber.ru' },
                            identityCard: { firstName: 'Павел', lastName: 'Небрежный', middleName: 'Аркадьевич' },
                          },
                          tenant: {
                            id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY',
                            shortTitle: 'Пром',
                            title: 'ИП СнабСбытСбыт',
                          },
                        },
                      },
                    ],
                  },
                  {
                    __typename: 'EduPlanActivityType',
                    id: 'epa_2NMqa6CHw8zPIczWYaKcDmuTnjC',
                    title: 'Изучение языка программирования Java',
                    activityEmployees: [
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NN3Ibruz9M3vN6xX29dUYmi0L4',
                          employeePerson: {
                            user: { email: 'staff0005@sber.ru' },
                            identityCard: { firstName: 'Павел', lastName: 'Небрежный', middleName: 'Аркадьевич' },
                          },
                          tenant: {
                            id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY',
                            shortTitle: 'Пром',
                            title: 'ИП СнабСбытСбыт',
                          },
                        },
                      },
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NN3eAeGOC5LMQ6hiCbf2iQzYSh',
                          employeePerson: {
                            user: { email: 'staff0008@sber.ru' },
                            identityCard: { firstName: 'Виктория', lastName: 'Боня', middleName: 'Вячеславна' },
                          },
                          tenant: {
                            id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY',
                            shortTitle: 'Пром',
                            title: 'ИП СнабСбытСбыт',
                          },
                        },
                      },
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NMoXvVnAe2vaqVnBoYxrRu4Gdj',
                          employeePerson: {
                            user: { email: 'staff0002@sber.ru' },
                            identityCard: { firstName: 'Анастасия', lastName: 'Кубышкина', middleName: 'Геннадьевна' },
                          },
                          tenant: {
                            id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY',
                            shortTitle: 'Пром',
                            title: 'ИП СнабСбытСбыт',
                          },
                        },
                      },
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NN3YdOawoHhRUm8pHCF7OKMkFf',
                          employeePerson: {
                            user: { email: 'staff0007@sber.ru' },
                            identityCard: { firstName: 'Артемий', lastName: 'Лебедев', middleName: 'Викторович' },
                          },
                          tenant: {
                            id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY',
                            shortTitle: 'Пром',
                            title: 'ИП СнабСбытСбыт',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
              {
                __typename: 'EduGridWithActivitiesType',
                id: 'edge_2Ff54IqjfDZzuvR93BASsXdlm0B',
                title: '2 семестр',
                eduPlanActivities: [
                  {
                    __typename: 'EduPlanActivityType',
                    id: 'epa_2NMqlt49B3QvXmRC6yCsABtcN8d',
                    title: 'Изучение языка программирования Python',
                    activityEmployees: [
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NN3YdOawoHhRUm8pHCF7OKMkFf',
                          employeePerson: {
                            user: { email: 'staff0007@sber.ru' },
                            identityCard: { firstName: 'Артемий', lastName: 'Лебедев', middleName: 'Викторович' },
                          },
                          tenant: {
                            id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY',
                            shortTitle: 'Пром',
                            title: 'ИП СнабСбытСбыт',
                          },
                        },
                      },
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NN3nBiE2rsYR5hkiUv1Z9NhpPX',
                          employeePerson: {
                            user: { email: 'staff0010@sber.ru' },
                            identityCard: { firstName: 'Павел', lastName: 'Ростков', middleName: 'Викторович' },
                          },
                          tenant: {
                            id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY',
                            shortTitle: 'Пром',
                            title: 'ИП СнабСбытСбыт',
                          },
                        },
                      },
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NN3eAeGOC5LMQ6hiCbf2iQzYSh',
                          employeePerson: {
                            user: { email: 'staff0008@sber.ru' },
                            identityCard: { firstName: 'Виктория', lastName: 'Боня', middleName: 'Вячеславна' },
                          },
                          tenant: {
                            id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY',
                            shortTitle: 'Пром',
                            title: 'ИП СнабСбытСбыт',
                          },
                        },
                      },
                    ],
                  },
                  {
                    __typename: 'EduPlanActivityType',
                    id: 'epa_2NMqerjDya8tLc4xNBIKOq3b9sZ',
                    title: 'Погружение нанотехнологии',
                    activityEmployees: [
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NN3YdOawoHhRUm8pHCF7OKMkFf',
                          employeePerson: {
                            user: { email: 'staff0007@sber.ru' },
                            identityCard: { firstName: 'Артемий', lastName: 'Лебедев', middleName: 'Викторович' },
                          },
                          tenant: {
                            id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY',
                            shortTitle: 'Пром',
                            title: 'ИП СнабСбытСбыт',
                          },
                        },
                      },
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NN3eAeGOC5LMQ6hiCbf2iQzYSh',
                          employeePerson: {
                            user: { email: 'staff0008@sber.ru' },
                            identityCard: { firstName: 'Виктория', lastName: 'Боня', middleName: 'Вячеславна' },
                          },
                          tenant: {
                            id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY',
                            shortTitle: 'Пром',
                            title: 'ИП СнабСбытСбыт',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
              {
                __typename: 'EduGridWithActivitiesType',
                id: 'edge_2Ff54JbdUqN8cZ4mY0g5rjvaevf',
                title: '3 семестр',
                eduPlanActivities: [
                  {
                    __typename: 'EduPlanActivityType',
                    id: 'epa_2NMqutOhoMrMaVot11n8dsrcNiR',
                    title: 'Архитектура современного приложения',
                    activityEmployees: [
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NMoRHDxfLCISiYwhiK6YIIYiWn',
                          employeePerson: {
                            user: { email: 'staff0001@sber.ru' },
                            identityCard: { firstName: 'Александр', lastName: 'Пушкин', middleName: 'Сергеевич' },
                          },
                          tenant: { id: 'tnt_2HDDkbQAoftLP6ggb3DXUyd9Tne', shortTitle: 'Сбыт', title: 'ОАО Кошелев' },
                        },
                      },
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NN3YdOawoHhRUm8pHCF7OKMkFf',
                          employeePerson: {
                            user: { email: 'staff0007@sber.ru' },
                            identityCard: { firstName: 'Артемий', lastName: 'Лебедев', middleName: 'Викторович' },
                          },
                          tenant: {
                            id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY',
                            shortTitle: 'Пром',
                            title: 'ИП СнабСбытСбыт',
                          },
                        },
                      },
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NN3nBiE2rsYR5hkiUv1Z9NhpPX',
                          employeePerson: {
                            user: { email: 'staff0010@sber.ru' },
                            identityCard: { firstName: 'Павел', lastName: 'Ростков', middleName: 'Викторович' },
                          },
                          tenant: {
                            id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY',
                            shortTitle: 'Пром',
                            title: 'ИП СнабСбытСбыт',
                          },
                        },
                      },
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NN3iJSioBbt1JzG32jIkfqSeRM',
                          employeePerson: {
                            user: { email: 'staff0009@sber.ru' },
                            identityCard: { firstName: 'Анна', lastName: 'Петровна', middleName: 'Николаевна' },
                          },
                          tenant: {
                            id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY',
                            shortTitle: 'Пром',
                            title: 'ИП СнабСбытСбыт',
                          },
                        },
                      },
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NN3Ibruz9M3vN6xX29dUYmi0L4',
                          employeePerson: {
                            user: { email: 'staff0005@sber.ru' },
                            identityCard: { firstName: 'Павел', lastName: 'Небрежный', middleName: 'Аркадьевич' },
                          },
                          tenant: {
                            id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY',
                            shortTitle: 'Пром',
                            title: 'ИП СнабСбытСбыт',
                          },
                        },
                      },
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NN3EAS0WXe6ciWKrFpawDP1iEe',
                          employeePerson: {
                            user: { email: 'staff0004@sber.ru' },
                            identityCard: { firstName: 'Арнольд', lastName: 'Шварцнегер', middleName: 'Янович' },
                          },
                          tenant: { id: 'tnt_2HDDkbQAoftLP6ggb3DXUyd9Tne', shortTitle: 'Сбыт', title: 'ОАО Кошелев' },
                        },
                      },
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NMoXvVnAe2vaqVnBoYxrRu4Gdj',
                          employeePerson: {
                            user: { email: 'staff0002@sber.ru' },
                            identityCard: { firstName: 'Анастасия', lastName: 'Кубышкина', middleName: 'Геннадьевна' },
                          },
                          tenant: {
                            id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY',
                            shortTitle: 'Пром',
                            title: 'ИП СнабСбытСбыт',
                          },
                        },
                      },
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NMofUv1KtIjYJmMUmP2YmG6lqP',
                          employeePerson: {
                            user: { email: 'staff0003@sber.ru' },
                            identityCard: { firstName: 'Певел', lastName: 'Петров', middleName: 'Анатольевич' },
                          },
                          tenant: { id: 'tnt_2HDDkbQAoftLP6ggb3DXUyd9Tne', shortTitle: 'Сбыт', title: 'ОАО Кошелев' },
                        },
                      },
                    ],
                  },
                ],
              },
              {
                __typename: 'EduGridWithActivitiesType',
                id: 'edge_2Ff54P0Q2OIRzYRfq9h0Mo5SyEb',
                title: '4 семестр',
                eduPlanActivities: [
                  {
                    __typename: 'EduPlanActivityType',
                    id: 'epa_2NMr2oSiT8RvveLTh291ngnmAAC',
                    title: 'Выпуская квалификационная работа',
                    activityEmployees: [
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NN3nBiE2rsYR5hkiUv1Z9NhpPX',
                          employeePerson: {
                            user: { email: 'staff0010@sber.ru' },
                            identityCard: { firstName: 'Павел', lastName: 'Ростков', middleName: 'Викторович' },
                          },
                          tenant: {
                            id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY',
                            shortTitle: 'Пром',
                            title: 'ИП СнабСбытСбыт',
                          },
                        },
                      },
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NMoRHDxfLCISiYwhiK6YIIYiWn',
                          employeePerson: {
                            user: { email: 'staff0001@sber.ru' },
                            identityCard: { firstName: 'Александр', lastName: 'Пушкин', middleName: 'Сергеевич' },
                          },
                          tenant: { id: 'tnt_2HDDkbQAoftLP6ggb3DXUyd9Tne', shortTitle: 'Сбыт', title: 'ОАО Кошелев' },
                        },
                      },
                      {
                        __typename: 'ActivityEmployeeType',
                        employeeType: {
                          id: 'pr_2NN3EAS0WXe6ciWKrFpawDP1iEe',
                          employeePerson: {
                            user: { email: 'staff0004@sber.ru' },
                            identityCard: { firstName: 'Арнольд', lastName: 'Шварцнегер', middleName: 'Янович' },
                          },
                          tenant: { id: 'tnt_2HDDkbQAoftLP6ggb3DXUyd9Tne', shortTitle: 'Сбыт', title: 'ОАО Кошелев' },
                        },
                      },
                    ],
                  },
                  {
                    __typename: 'EduPlanActivityType',
                    id: 'epa_2NMqzblBbYbSc63uBCEvm5e8xR6',
                    title: 'Практика в IT компании',
                    activityEmployees: [],
                  },
                ],
              },
            ],
          },
        };
    }
  }

  static getEmployeesPaging(answer: TeacherAnswer): string | unknown {
    switch (answer) {
      default:
        return { data: { getEmployeesPaging0: { count: 10 } } };
      case TeacherAnswer.WITHOUT_TEACHERS:
        return { data: { getEmployeesPaging0: { count: 0 } } };
    }
  }

  static addActivityEmployees(): string | unknown {
    return { data: { addActivityEmployees0: ['pr_2NN3QWBarBzVErD6r4fuAyg0bmD'] } };
  }

  static getActivityEmployeesForInvitation(model: EmployeeModel): string | unknown {
    return {
      data: {
        getActivityEmployeesForInvitation0: [
          {
            __typename: 'EmployeeType',
            id: 'pr_2NMoRHDxfLCISiYwhiK6YIIYiWn',
            employeePerson: {
              user: { email: 'staff0001@sber.ru' },
              identityCard: { firstName: 'Александр', lastName: 'Пушкин', middleName: 'Сергеевич' },
            },
            tenant: { id: 'tnt_2HDDkbQAoftLP6ggb3DXUyd9Tne', shortTitle: 'Сбыт', title: 'ОАО Кошелев' },
          },
          {
            __typename: 'EmployeeType',
            id: 'pr_2NMoXvVnAe2vaqVnBoYxrRu4Gdj',
            employeePerson: {
              user: { email: 'staff0002@sber.ru' },
              identityCard: { firstName: 'Анастасия', lastName: 'Кубышкина', middleName: 'Геннадьевна' },
            },
            tenant: { id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY', shortTitle: 'Пром', title: 'ИП СнабСбытСбыт' },
          },
          {
            __typename: 'EmployeeType',
            id: 'pr_2NMofUv1KtIjYJmMUmP2YmG6lqP',
            employeePerson: {
              user: { email: 'staff0003@sber.ru' },
              identityCard: { firstName: 'Певел', lastName: 'Петров', middleName: 'Анатольевич' },
            },
            tenant: { id: 'tnt_2HDDkbQAoftLP6ggb3DXUyd9Tne', shortTitle: 'Сбыт', title: 'ОАО Кошелев' },
          },
          {
            __typename: 'EmployeeType',
            id: 'pr_2NN3EAS0WXe6ciWKrFpawDP1iEe',
            employeePerson: {
              user: { email: 'staff0004@sber.ru' },
              identityCard: { firstName: 'Арнольд', lastName: 'Шварцнегер', middleName: 'Янович' },
            },
            tenant: { id: 'tnt_2HDDkbQAoftLP6ggb3DXUyd9Tne', shortTitle: 'Сбыт', title: 'ОАО Кошелев' },
          },
          {
            __typename: 'EmployeeType',
            id: 'pr_2NN3Ibruz9M3vN6xX29dUYmi0L4',
            employeePerson: {
              user: { email: 'staff0005@sber.ru' },
              identityCard: { firstName: 'Павел', lastName: 'Небрежный', middleName: 'Аркадьевич' },
            },
            tenant: { id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY', shortTitle: 'Пром', title: 'ИП СнабСбытСбыт' },
          },
          {
            __typename: 'EmployeeType',
            id: 'pr_2NN3QWBarBzVErD6r4fuAyg0bmD',
            employeePerson: {
              user: { email: `${model.email}` },
              identityCard: {
                firstName: `${model.firstName}`,
                lastName: `${model.lastName}`,
                middleName: `${model.middleName}`,
              },
            },
            tenant: { id: 'tnt_2HDDkbQAoftLP6ggb3DXUyd9Tne', shortTitle: 'Сбыт', title: 'ОАО Кошелев' },
          },
          {
            __typename: 'EmployeeType',
            id: 'pr_2NN3YdOawoHhRUm8pHCF7OKMkFf',
            employeePerson: {
              user: { email: 'staff0007@sber.ru' },
              identityCard: { firstName: 'Артемий', lastName: 'Лебедев', middleName: 'Викторович' },
            },
            tenant: { id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY', shortTitle: 'Пром', title: 'ИП СнабСбытСбыт' },
          },
          {
            __typename: 'EmployeeType',
            id: 'pr_2NN3eAeGOC5LMQ6hiCbf2iQzYSh',
            employeePerson: {
              user: { email: 'staff0008@sber.ru' },
              identityCard: { firstName: 'Виктория', lastName: 'Боня', middleName: 'Вячеславна' },
            },
            tenant: { id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY', shortTitle: 'Пром', title: 'ИП СнабСбытСбыт' },
          },
          {
            __typename: 'EmployeeType',
            id: 'pr_2NN3iJSioBbt1JzG32jIkfqSeRM',
            employeePerson: {
              user: { email: 'staff0009@sber.ru' },
              identityCard: { firstName: 'Анна', lastName: 'Петровна', middleName: 'Николаевна' },
            },
            tenant: { id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY', shortTitle: 'Пром', title: 'ИП СнабСбытСбыт' },
          },
          {
            __typename: 'EmployeeType',
            id: 'pr_2NN3nBiE2rsYR5hkiUv1Z9NhpPX',
            employeePerson: {
              user: { email: 'staff0010@sber.ru' },
              identityCard: { firstName: 'Павел', lastName: 'Ростков', middleName: 'Викторович' },
            },
            tenant: { id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY', shortTitle: 'Пром', title: 'ИП СнабСбытСбыт' },
          },
          {
            __typename: 'EmployeeType',
            id: 'pr_2NN3nBiE2rsYR5hkiUv1Z4NhpPX',
            employeePerson: {
              user: { email: 'staff0011@sber.ru' },
              identityCard: { firstName: 'Игорь', lastName: 'Кузьмаков', middleName: 'Викторович' },
            },
            tenant: { id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY', shortTitle: 'Пром', title: 'ИП СнабСбытСбыт' },
          },
          {
            __typename: 'EmployeeType',
            id: 'pr_2NN3nBiE2rsYR5hkiUv6Z9NhpPX',
            employeePerson: {
              user: { email: 'staff0012@sber.ru' },
              identityCard: { firstName: 'Сергей', lastName: 'Лаврович', middleName: 'Петрович' },
            },
            tenant: { id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY', shortTitle: 'Пром', title: 'ИП СнабСбытСбыт' },
          },
          {
            __typename: 'EmployeeType',
            id: 'pr_2NN3nBiE2rsYR5hkiUv2Z9NhpPX',
            employeePerson: {
              user: { email: 'staff0013@sber.ru' },
              identityCard: { firstName: 'Петр', lastName: 'Павел', middleName: 'Сергеевич' },
            },
            tenant: { id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY', shortTitle: 'Пром', title: 'ИП СнабСбытСбыт' },
          },
          {
            __typename: 'EmployeeType',
            id: 'pr_2NN3nBiE3rsYR2hkiUv1Z9NhpPX',
            employeePerson: {
              user: { email: 'staff0014@sber.ru' },
              identityCard: { firstName: 'Станислав', lastName: 'Бычков', middleName: 'Дмитревич' },
            },
            tenant: { id: 'tnt_2HDFtx1pQw0aijGBLqG9WcPiZUY', shortTitle: 'Пром', title: 'ИП СнабСбытСбыт' },
          },
        ],
      },
    };
  }
}
