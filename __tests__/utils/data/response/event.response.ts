import { EventModel } from '../model/event.model';
import { CommonHelper } from '../../common.helper';
import { DateFormat } from '../model/enums/dateFormat';
import { StudentModel } from '../model/student.model';
import { EventAnswer } from '../enum/event.answer.enum';

export class EventResponse {
  static publishEduPlanWebinar(): string | unknown {
    return { data: { publishEduPlanWebinar0: { isPublished: true } } };
  }

  static getEduPlanWebinarRecordLink(): string | unknown {
    return {
      data: { getEduPlanWebinarRecordLink0: 'https://events.webinar.ru/72095333/476374364/record-new/403078825' },
    };
  }

  static getEduPlanParticipantPersonalLinks(): string | unknown {
    return {
      data: {
        getEduPlanParticipantPersonalLinks0: [
          { link: 'https://events.webinar.ru/72095333/1708535075/ba1a8c9fea19cd708bc85bbd3a29660f' },
        ],
      },
    };
  }

  static removeEduPlanWebinar(): string | unknown {
    return { data: { removeEduPlanWebinar0: { id: 'evt_2M2YZj2NL0k2kEdEnbKxCdiAFvw' } } };
  }

  static readCourses(student: StudentModel): string | unknown {
    return {
      data: {
        readCourses0: [
          {
            __typename: 'Course',
            id: 'eplc_2EIzLugThc3R6BhBydW08jhRIQb',
            title: `${student.course.name}`,
          },
          { __typename: 'Course', id: 'eplc_2EIzLxHr6kcPQusHLeifBVrv8WO', title: '5 курс' },
        ],
      },
    };
  }

  static setEduPlanWebinar(): string | unknown {
    return { data: { setEduPlanWebinar0: { id: 'evt_2M2YZj2NL0k2kEdEnbKxCdiAFvw' } } };
  }

  static setEduPlanParticipants(): string | unknown {
    return { data: { setEduPlanParticipants0: { eventId: 'evt_2M2YZj2NL0k2kEdEnbKxCdiAFvw' } } };
  }

  static getEduPlanParticipants(answer: EventAnswer, student: StudentModel): string | unknown {
    switch (answer) {
      default:
        return null;
      case EventAnswer.SUCCESS:
        return {
          data: {
            getEduPlanParticipants0: {
              entities: [
                {
                  __typename: 'EPParticipantDTO',
                  participantId: 'pr_2Mlnx6ODfT8L6xeJfuAN01uxedP',
                  personRoleType: {
                    person: {
                      identityCard: { lastName: 'Cremin', firstName: 'Kira', middleName: 'Reese' },
                      user: { email: 'studentandre21@ya.ru' },
                    },
                    student: { courseId: 'eplc_2EIzLugThc3R6BhBydW08jhRIQb', group: { title: '8302' } },
                  },
                  isOrganizer: false,
                },
                {
                  __typename: 'EPParticipantDTO',
                  participantId: 'pr_2MlnqbQGI0zGHsvXEY3T8uwji37',
                  personRoleType: {
                    person: {
                      identityCard: { lastName: 'Dach', firstName: 'Gregoria', middleName: 'Nico' },
                      user: { email: 'studentcolleen.zboncak@hotmail.com' },
                    },
                    student: { courseId: 'eplc_2EIzLugThc3R6BhBydW08jhRIQb', group: { title: '3039' } },
                  },
                  isOrganizer: false,
                },
                {
                  __typename: 'EPParticipantDTO',
                  participantId: 'pr_2MlnxCc8Wpvnq8ZsjgfnmoC13F3',
                  personRoleType: {
                    person: {
                      identityCard: {
                        lastName: 'Farrell',
                        firstName: 'Enoch',
                        middleName: 'Elliott',
                      },
                      user: { email: 'studentgina10@mail.ru' },
                    },
                    student: { courseId: 'eplc_2EIzLugThc3R6BhBydW08jhRIQb', group: { title: '2800' } },
                  },
                  isOrganizer: false,
                },
                {
                  __typename: 'EPParticipantDTO',
                  participantId: 'pr_2Mlnx4iybho85TMBacDa3h6qDzO',
                  personRoleType: {
                    person: {
                      identityCard: { lastName: 'Hand', firstName: 'Cayla', middleName: 'Sage' },
                      user: { email: 'studentrandy_mills@ya.ru' },
                    },
                    student: { courseId: 'eplc_2EIzLugThc3R6BhBydW08jhRIQb', group: { title: '6231' } },
                  },
                  isOrganizer: false,
                },
                {
                  __typename: 'EPParticipantDTO',
                  participantId: 'pr_2MlnxbMqVX9CfttTjybN8msP8PI',
                  personRoleType: {
                    person: {
                      identityCard: {
                        lastName: 'Medhurst',
                        firstName: 'Laury',
                        middleName: 'Greer',
                      },
                      user: { email: 'studentmarcel.robel@gmail.com' },
                    },
                    student: { courseId: 'eplc_2EIzLugThc3R6BhBydW08jhRIQb', group: { title: '5331' } },
                  },
                  isOrganizer: false,
                },
                {
                  __typename: 'EPParticipantDTO',
                  participantId: 'pr_2MlnxCqiuhkUyMcMrXQe7MBlid7',
                  personRoleType: {
                    person: {
                      identityCard: {
                        lastName: 'Ziemann',
                        firstName: 'Floyd',
                        middleName: 'Cameron',
                      },
                      user: { email: 'studentgraham_dickens91@ya.ru' },
                    },
                    student: { courseId: 'eplc_2EIzLugThc3R6BhBydW08jhRIQb', group: { title: '4318' } },
                  },
                  isOrganizer: false,
                },

                {
                  __typename: 'EPParticipantDTO',
                  participantId: 'pr_2MPY4db0tojWADqflmniwl7oahe',
                  personRoleType: {
                    person: {
                      identityCard: {
                        lastName: 'Gleason',
                        firstName: 'Bianka',
                        middleName: 'Bailey',
                      },
                      user: { email: 'employeearden_skiles@mail.ru' },
                    },
                    student: null,
                  },
                  isOrganizer: false,
                },
                {
                  __typename: 'EPParticipantDTO',
                  participantId: 'pr_2MMifBBiV78O5ZGyzGcgqZRzOuA',
                  personRoleType: {
                    person: {
                      identityCard: { lastName: 'Gleason', firstName: 'Nona', middleName: 'Kai' },
                      user: { email: 'employeebuster46@yandex.ru' },
                    },
                    student: null,
                  },
                  isOrganizer: false,
                },
                {
                  __typename: 'EPParticipantDTO',
                  participantId: 'pr_2KocThYV3LTJkucXmbp4TmSToyZ',
                  personRoleType: {
                    person: {
                      identityCard: { lastName: 'Lowe', firstName: 'Nina', middleName: 'Rory' },
                      user: { email: 'employeekaycee16@yahoo.com' },
                    },
                    student: null,
                  },
                  isOrganizer: false,
                },
                {
                  __typename: 'EPParticipantDTO',
                  participantId: 'pr_2KrNJamT4ZEFpSMX4t3UH39zv1l',
                  personRoleType: {
                    person: {
                      identityCard: { lastName: 'OKeefe', firstName: 'Rory', middleName: 'Kai' },
                      user: { email: 'employeeopal_jakubowski@gmail.com' },
                    },
                    student: null,
                  },
                  isOrganizer: false,
                },
                {
                  __typename: 'EPParticipantDTO',
                  participantId: 'pr_2MgOJZ2kKj6RI4Zxpe0wITTYtB6',
                  personRoleType: {
                    person: {
                      identityCard: {
                        lastName: 'Swaniawski',
                        firstName: 'Nestor',
                        middleName: 'Shawn',
                      },
                      user: { email: 'employeedorian_rosenbaum52@yandex.ru' },
                    },
                    student: null,
                  },
                  isOrganizer: false,
                },
                {
                  __typename: 'EPParticipantDTO',
                  participantId: 'pr_2MgC2nBtuciFbVImblxHx0jAnYc',
                  personRoleType: {
                    person: {
                      identityCard: {
                        lastName: 'Thompson',
                        firstName: 'Alessandra',
                        middleName: 'Jaden',
                      },
                      user: { email: 'employeelucie_boyle@mail.ru' },
                    },
                    student: null,
                  },
                  isOrganizer: false,
                },
                {
                  __typename: 'EPParticipantDTO',
                  participantId: 'pr_2MMpiVb8xzWCn1p4tcCAOEUzYno',
                  personRoleType: {
                    person: {
                      identityCard: {
                        lastName: 'Weissnat',
                        firstName: 'Gardner',
                        middleName: 'Reign',
                      },
                      user: { email: 'employeehaven.connelly82@hotmail.com' },
                    },
                    student: null,
                  },
                  isOrganizer: false,
                },
                {
                  __typename: 'EPParticipantDTO',
                  participantId: 'pr_2Kb1QIpnOVCczwjYBYmfAEZGOST',
                  personRoleType: {
                    person: {
                      identityCard: {
                        lastName: 'Zulauf',
                        firstName: 'Pearl',
                        middleName: 'Harper',
                      },
                      user: { email: 'employeeturner83@gmail.com' },
                    },
                    student: null,
                  },
                  isOrganizer: false,
                },
                {
                  __typename: 'EPParticipantDTO',
                  participantId: 'pr_2IrLxBaGoRXSNfSw20RkrkjQqcr',
                  personRoleType: {
                    person: {
                      identityCard: {
                        lastName: 'Конфигуратор',
                        firstName: 'Тест',
                        middleName: 'Тестович',
                      },
                      user: { email: 'employeeprogress@sber.com' },
                    },
                    student: null,
                  },
                  isOrganizer: false,
                },
                {
                  __typename: 'EPParticipantDTO',
                  participantId: 'pr_2Kio2PYrIZpur1c4iryuW4hUJgS',
                  personRoleType: {
                    person: {
                      identityCard: {
                        lastName: `${student.lastName}`,
                        firstName: `${student.firstName}`,
                        middleName: `${student.middleName}`,
                      },
                      user: { email: `${student.email}` },
                    },
                    student: {
                      courseId: 'eplc_2EIzLugThc3R6BhBydW08jhRIQb',
                      group: { title: `${student.group}` },
                    },
                  },
                  isOrganizer: true,
                },
              ],
            },
          },
        };
      case EventAnswer.EMPTY_PARTICIPANTS:
        return { data: { getEduPlanParticipants0: { entities: [] } } };
    }
  }

  static getEduPlanParticipantsToInvite(student: StudentModel): string | unknown {
    return {
      data: {
        getEduPlanParticipantsToInvite0: {
          entities: [
            {
              __typename: 'PersonRoleType',
              id: 'pr_2Kio2PYrIZpur1c4iryuW4hUJgS',
              person: {
                identityCard: {
                  lastName: `${student.lastName}`,
                  firstName: `${student.firstName}`,
                  middleName: `${student.middleName}`,
                },
                user: {
                  email: `${student.email}`,
                },
              },
              student: {
                courseId: 'eplc_2EIzLugThc3R6BhBydW08jhRIQb',
                group: {
                  title: `${student.group}`,
                },
              },
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2KauYXQtiveRugFuocaftUyu7vy',
              person: {
                identityCard: {
                  lastName: 'Abernathy',
                  firstName: 'Natalie',
                  middleName: 'Bowie',
                },
                user: {
                  email: 'employeekamren.mohr25@ya.ru',
                },
              },
              student: null,
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2KodFBDhto6rebqjGhh5IakkaxY',
              person: {
                identityCard: {
                  lastName: 'Abshire',
                  firstName: 'Alysha',
                  middleName: 'Emerson',
                },
                user: {
                  email: 'employeedaryl_heathcote@gmail.com',
                },
              },
              student: null,
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2MgLXsgsfCCmkOn7WwERTqm3YxQ',
              person: {
                identityCard: {
                  lastName: 'Collins',
                  firstName: 'Ara',
                  middleName: 'Robin',
                },
                user: {
                  email: 'employeeangela.muller@yahoo.com',
                },
              },
              student: null,
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2MgLRHzql58TFjBqHkCHCmzJptM',
              person: {
                identityCard: {
                  lastName: 'Conn',
                  firstName: 'Hattie',
                  middleName: 'Brooklyn',
                },
                user: {
                  email: 'employeetitus10@mail.ru',
                },
              },
              student: null,
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2Mlnx6ODfT8L6xeJfuAN01uxedP',
              person: {
                identityCard: {
                  lastName: 'Cremin',
                  firstName: 'Kira',
                  middleName: 'Reese',
                },
                user: {
                  email: 'studentandre21@ya.ru',
                },
              },
              student: {
                courseId: 'eplc_2EIzLugThc3R6BhBydW08jhRIQb',
                group: {
                  title: '8302',
                },
              },
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2MlnqbQGI0zGHsvXEY3T8uwji37',
              person: {
                identityCard: {
                  lastName: 'Dach',
                  firstName: 'Gregoria',
                  middleName: 'Nico',
                },
                user: {
                  email: 'studentcolleen.zboncak@hotmail.com',
                },
              },
              student: {
                courseId: 'eplc_2EIzLugThc3R6BhBydW08jhRIQb',
                group: {
                  title: '3039',
                },
              },
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2MlnxCc8Wpvnq8ZsjgfnmoC13F3',
              person: {
                identityCard: {
                  lastName: 'Farrell',
                  firstName: 'Enoch',
                  middleName: 'Elliott',
                },
                user: {
                  email: 'studentgina10@mail.ru',
                },
              },
              student: {
                courseId: 'eplc_2EIzLugThc3R6BhBydW08jhRIQb',
                group: {
                  title: '2800',
                },
              },
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2MPY4db0tojWADqflmniwl7oahe',
              person: {
                identityCard: {
                  lastName: 'Gleason',
                  firstName: 'Bianka',
                  middleName: 'Bailey',
                },
                user: {
                  email: 'employeearden_skiles@mail.ru',
                },
              },
              student: null,
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2MMifBBiV78O5ZGyzGcgqZRzOuA',
              person: {
                identityCard: {
                  lastName: 'Gleason',
                  firstName: 'Nona',
                  middleName: 'Kai',
                },
                user: {
                  email: 'employeebuster46@yandex.ru',
                },
              },
              student: null,
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2Mlnx4iybho85TMBacDa3h6qDzO',
              person: {
                identityCard: {
                  lastName: 'Hand',
                  firstName: 'Cayla',
                  middleName: 'Sage',
                },
                user: {
                  email: 'studentrandy_mills@ya.ru',
                },
              },
              student: {
                courseId: 'eplc_2EIzLugThc3R6BhBydW08jhRIQb',
                group: {
                  title: '6231',
                },
              },
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2KatI7LNn3xiRZw1mLFLRxIIKTU',
              person: {
                identityCard: {
                  lastName: 'Hilpert',
                  firstName: 'Gussie',
                  middleName: 'Rowan',
                },
                user: {
                  email: 'employeecarolyne88@yandex.ru',
                },
              },
              student: null,
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2MgNtKNRUNTb6vVDaLd0SrkvRAB',
              person: {
                identityCard: {
                  lastName: 'Hoeger',
                  firstName: 'Ari',
                  middleName: 'Kai',
                },
                user: {
                  email: 'employeejolie_breitenberg40@yandex.ru',
                },
              },
              student: null,
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2MMj9ACF9WE5AV3iT05zoPKcRm7',
              person: {
                identityCard: {
                  lastName: 'Kuhic',
                  firstName: 'Dante',
                  middleName: 'Kai',
                },
                user: {
                  email: 'employeeminnie38@ya.ru',
                },
              },
              student: null,
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2KocThYV3LTJkucXmbp4TmSToyZ',
              person: {
                identityCard: {
                  lastName: 'Lowe',
                  firstName: 'Nina',
                  middleName: 'Rory',
                },
                user: {
                  email: 'employeekaycee16@yahoo.com',
                },
              },
              student: null,
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2Kb4ExcLIQumMb0dWMNtRnheOMx',
              person: {
                identityCard: {
                  lastName: 'Mante',
                  firstName: 'Telly',
                  middleName: 'Jaden',
                },
                user: {
                  email: 'employeeeudora_conn2@yandex.ru',
                },
              },
              student: null,
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2MlnxbMqVX9CfttTjybN8msP8PI',
              person: {
                identityCard: {
                  lastName: 'Medhurst',
                  firstName: 'Laury',
                  middleName: 'Greer',
                },
                user: {
                  email: 'studentmarcel.robel@gmail.com',
                },
              },
              student: {
                courseId: 'eplc_2EIzLugThc3R6BhBydW08jhRIQb',
                group: {
                  title: '5331',
                },
              },
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2KrNJamT4ZEFpSMX4t3UH39zv1l',
              person: {
                identityCard: {
                  lastName: 'OKeefe',
                  firstName: 'Rory',
                  middleName: 'Kai',
                },
                user: {
                  email: 'employeeopal_jakubowski@gmail.com',
                },
              },
              student: null,
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2MgOJZ2kKj6RI4Zxpe0wITTYtB6',
              person: {
                identityCard: {
                  lastName: 'Swaniawski',
                  firstName: 'Nestor',
                  middleName: 'Shawn',
                },
                user: {
                  email: 'employeedorian_rosenbaum52@yandex.ru',
                },
              },
              student: null,
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2MgC2nBtuciFbVImblxHx0jAnYc',
              person: {
                identityCard: {
                  lastName: 'Thompson',
                  firstName: 'Alessandra',
                  middleName: 'Jaden',
                },
                user: {
                  email: 'employeelucie_boyle@mail.ru',
                },
              },
              student: null,
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2MMpiVb8xzWCn1p4tcCAOEUzYno',
              person: {
                identityCard: {
                  lastName: 'Weissnat',
                  firstName: 'Gardner',
                  middleName: 'Reign',
                },
                user: {
                  email: 'employeehaven.connelly82@hotmail.com',
                },
              },
              student: null,
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2MlnxCqiuhkUyMcMrXQe7MBlid7',
              person: {
                identityCard: {
                  lastName: 'Ziemann',
                  firstName: 'Floyd',
                  middleName: 'Cameron',
                },
                user: {
                  email: 'studentgraham_dickens91@ya.ru',
                },
              },
              student: {
                courseId: 'eplc_2EIzLugThc3R6BhBydW08jhRIQb',
                group: {
                  title: '4318',
                },
              },
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2Kb1QIpnOVCczwjYBYmfAEZGOST',
              person: {
                identityCard: {
                  lastName: 'Zulauf',
                  firstName: 'Pearl',
                  middleName: 'Harper',
                },
                user: {
                  email: 'employeeturner83@gmail.com',
                },
              },
              student: null,
            },
            {
              __typename: 'PersonRoleType',
              id: 'pr_2IrLxBaGoRXSNfSw20RkrkjQqcr',
              person: {
                identityCard: {
                  lastName: 'Конфигуратор',
                  firstName: 'Тест',
                  middleName: 'Тестович',
                },
                user: {
                  email: 'employeeprogress@sber.com',
                },
              },
              student: null,
            },
          ],
        },
      },
    };
  }

  static getEduPlanEventKinds(event: EventModel): string | unknown {
    return {
      data: {
        getEduPlanEventKinds: [
          {
            __typename: 'EventKindDTO',
            id: 'evk_2KamBOoYzqdztwSwWisv35jztL1',
            title: 'Вебинар',
            systemCode: 'webinar',
          },
        ],
        getEduPlanEventFormats: [
          {
            __typename: 'EventFormatDTO',
            id: 'evf_2KamBSqULzzWbGWRd2zRqmlQw5C',
            title: `${event.format.name}`,
            systemCode: `${event.format.code}`,
          },
        ],
        readVideoConfKinds0: [
          {
            __typename: 'VideoConfKind',
            id: 'vck_2PKS2zz34QE74HSIZAvb6zjihmn',
            title: 'Другой сервис',
            systemCode: 'other',
          },
          {
            __typename: 'VideoConfKind',
            id: 'vck_2OxEiKDIc15kF3p6lUQKo3vnx0A',
            title: 'Webinar.ru',
            systemCode: 'webinar',
          },
        ],
      },
    };
  }

  static getEduPlanEventFormats(): string | unknown {
    return {
      data: {
        getEduPlanEventFormats: [
          {
            __typename: 'EventFormatDTO',
            id: 'evf_2KamBSqULzzWbGWRd2zRqmlQw5C',
            title: 'Онлайн',
            systemCode: 'online',
          },
          {
            __typename: 'EventFormatDTO',
            id: 'evf_2KamBSyQQez61ZOxG0Ve9Rvvj2Y',
            title: 'Оффлайн',
            systemCode: 'offline',
          },
          {
            __typename: 'EventFormatDTO',
            id: 'evf_2KamBV4Ix8IeF6prd49eXpynQ07',
            title: 'Смешанный',
            systemCode: 'mixed',
          },
        ],
      },
    };
  }

  static readVideoConfKinds(event: EventModel): string | unknown {
    return {
      data: {
        getEduPlanEventKinds: [
          {
            __typename: 'EventKindDTO',
            id: 'evk_2KamBOoYzqdztwSwWisv35jztL1',
            title: 'Вебинар',
            systemCode: 'webinar',
          },
        ],
        getEduPlanEventFormats: [
          {
            __typename: 'EventFormatDTO',
            id: 'evf_2KamBSqULzzWbGWRd2zRqmlQw5C',
            title: `${event.format.name}`,
            systemCode: `${event.format.code}`,
          },
        ],
        readVideoConfKinds0: [
          {
            __typename: 'VideoConfKind',
            id: 'vck_2PKS2zz34QE74HSIZAvb6zjihmn',
            title: `${event.service.name}`,
            systemCode: `${event.service.code}`,
          },
          {
            __typename: 'VideoConfKind',
            id: 'vck_2OxEiKDIc15kF3p6lUQKo3vnx0A',
            title: 'Webinar.ru',
            systemCode: 'webinar',
          },
        ],
      },
    };
  }

  static getEduPlanWebinars(answer: EventAnswer, event: EventModel): string | unknown {
    switch (answer) {
      default:
        return null;
      case EventAnswer.SUCCESS:
        return {
          data: {
            getEduPlanWebinars1: { count: 10 },
            getEduPlanEventKinds: [
              {
                __typename: 'EventKindDTO',
                id: 'evk_2KamBOoYzqdztwSwWisv35jztL1',
                title: 'Вебинар',
                systemCode: 'webinar',
              },
            ],
            getEduPlanWebinars0: { count: 2 },
            getEduPlanWebinars2: {
              webinars: [
                {
                  __typename: 'WebinarDTO',
                  id: 'evt_2M2YJs6TcW6CTgf1w4z8ndsNtVR',
                  title: 'Дистанционное обучение - реалии и перспективы',
                  kindId: 'evk_2KamBOoYzqdztwSwWisv35jztL1',
                  endAt: '2028-04-10T11:50Z',
                  startAt: '2028-04-10T07:30Z',
                  authorId: '',
                  ownerId: 'epl_2Kb1TimnZGbvHcZCy3AiqX1z7og',
                  description:
                    'Активизация научной и инновационной деятельности педагогических работников, распространение положительного опыта внедрения и использования дистанционных технологий в образовательных организациях.',
                  formatId: 'evf_2KamBV4Ix8IeF6prd49eXpynQ07',
                  isPublished: true,
                  link: 'https://jazz.sber.ru/rrt00g?psw=OBYbUAEMFRpeBhxGXhgCCVEMAQ',
                  place: 'Менделеевская линия, 2, Санкт-Петербург',
                  participantsCount: 5,
                },
                {
                  __typename: 'WebinarDTO',
                  id: 'evt_2KiwFKZljnfhqNlxT4mCc2fu6ZW',
                  title: 'Использование информационных технологий в образовательной деятельности',
                  kindId: 'evk_2KamBOoYzqdztwSwWisv35jztL1',
                  endAt: '2028-10-10T15:30Z',
                  startAt: '2028-10-10T09:00Z',
                  authorId: '',
                  ownerId: 'epl_2Kb1TimnZGbvHcZCy3AiqX1z7og',
                  description:
                    'Выявление инновационных подходов к созданию цифровой образовательной среды в образовательных организациях, повышение уровня цифровой культуры педагогических работников для достижения нового качества образования.',
                  formatId: 'evf_2KamBSqULzzWbGWRd2zRqmlQw5C',
                  isPublished: true,
                  link: 'https://jazz.sber.ru/pumhd1?psw=OAMHFBFdAU4AEwACTkkWXQ8ZHQ',
                  place: null,
                  participantsCount: 4,
                },
                {
                  __typename: 'WebinarDTO',
                  id: 'evt_2KiqJG8cIBC0PgrSvxbJKgp3URl',
                  title:
                    'Проблемы и перспективы внедрения отечественных и свободных программных и технических решений в образовании',
                  kindId: 'evk_2KamBOoYzqdztwSwWisv35jztL1',
                  endAt: '2030-09-01T13:00Z',
                  startAt: '2030-09-01T09:00Z',
                  authorId: '',
                  ownerId: 'epl_2Kb1TimnZGbvHcZCy3AiqX1z7og',
                  description:
                    'С 2008 года Конференция является основной информационной площадкой для обмена опытом использования свободно распространяемого программного обеспечения, открытых технических решений, а также бесплатных интернет-сервисов в образовательных организациях Санкт-Петербурга. Основная идея Конференции - поиск доступных и эффективных цифровых инструментов для школы, учителя и ученика. В контексте политики импортозамещения в рамках Конференции рассматриваются отечественные программные и технические продукты, во многом построенные на свободных и открытых решениях.',
                  formatId: 'evf_2KamBV4Ix8IeF6prd49eXpynQ07',
                  isPublished: true,
                  link: 'https://jazz.sber.ru/ed5n65?psw=OEMDAgQeBAcQUwQUWwoTFB9ZGQ',
                  place: 'Политехническая ул., 29, Санкт-Петербург',
                  participantsCount: 8,
                },
                {
                  __typename: 'WebinarDTO',
                  id: 'evt_2M2Whj8vSL1tWqSOhB83sAlDYpb',
                  title: 'Конкурс образовательных подкастов "Учись видеть"',
                  kindId: 'evk_2KamBOoYzqdztwSwWisv35jztL1',
                  endAt: '2032-03-08T11:30Z',
                  startAt: '2032-03-08T07:30Z',
                  authorId: '',
                  ownerId: 'epl_2Kb1TimnZGbvHcZCy3AiqX1z7og',
                  description:
                    'Способствовать насыщению цифровой среды обучения.\n\nСпособствовать достижению новых (социальных, профессиональных, личностных) эффектов в цифровой среде обучения.\n\nСтимулировать методологической сдвиг профессиональной деятельности педагога.\n\nСпособствовать развитию инструментальных компетенций педагогов.\n\nСпособствовать трансформированию компонентного состава среды обучения в процессе ее цифровизации.\n\nСоздать методическую базу образовательных подкастов, в том числе на портале дистанционного обучения Санкт-Петербурга.',
                  formatId: 'evf_2KamBSqULzzWbGWRd2zRqmlQw5C',
                  isPublished: false,
                  link: 'https://jazz.sber.ru/tdd6cv?psw=OEMIVBQDF08PUw9CSxcAXABZEg',
                  place: null,
                  participantsCount: 9,
                },
                {
                  __typename: 'WebinarDTO',
                  id: 'evt_2KiwNSAuqK4RPeplv4klyL8gyNp',
                  title: 'Лекция "Соседи динозавров"',
                  kindId: 'evk_2KamBOoYzqdztwSwWisv35jztL1',
                  endAt: '2038-08-24T09:30Z',
                  startAt: '2038-08-24T07:30Z',
                  authorId: '',
                  ownerId: 'epl_2Kb1TimnZGbvHcZCy3AiqX1z7og',
                  description:
                    'В детстве многие из нас увлекались динозаврами. Признавайтесь, у кого была та самая энциклопедия? Самое время порадовать внутреннего ребёнка и послушать лекцию Дмитрия Соболева — автора проекта «Упоротый палеонтолог» и популяризатора палеонтологии и эволюционной биологии.',
                  formatId: 'evf_2KamBSqULzzWbGWRd2zRqmlQw5C',
                  isPublished: false,
                  link: 'https://jazz.sber.ru/64dtfj?psw=OEJSAhgcVRMRUlUURwhCAB5YSA',
                  place: null,
                  participantsCount: 2,
                },
                {
                  __typename: 'WebinarDTO',
                  id: 'evt_2KiwIiOeBcT3zIpEJekhfDKnkNn',
                  title: 'Цикл лекций "Мода и искусство 1950-1960 гг."',
                  kindId: 'evk_2KamBOoYzqdztwSwWisv35jztL1',
                  endAt: '2038-11-08T13:40Z',
                  startAt: '2038-11-08T11:20Z',
                  authorId: '',
                  ownerId: 'epl_2Kb1TimnZGbvHcZCy3AiqX1z7og',
                  description:
                    'Стиляги и первые хиппи сформировали не просто альтернативную молодежную моду 1950–60-х, но и повлияли на развитие отечественного дизайна костюма в целом.',
                  formatId: 'evf_2KamBSqULzzWbGWRd2zRqmlQw5C',
                  isPublished: false,
                  link: 'https://jazz.sber.ru/l6gbnb?psw=OB8aCUcdAAcLDx0fGAkXFAQFAA',
                  place: null,
                  participantsCount: 2,
                },
                {
                  __typename: 'WebinarDTO',
                  id: 'evt_2M2YZj2NL0k2kEdEnbKxCdiAFvw',
                  title: `${event.title}`,
                  kindId: 'evk_2KamBOoYzqdztwSwWisv35jztL1',
                  endAt: `${new CommonHelper().getDateInFormat(event.endAt, DateFormat.yyyyMMddTHHmm0300)}`,
                  startAt: `${new CommonHelper().getDateInFormat(event.startAt, DateFormat.yyyyMMddTHHmm0300)}`,
                  authorId: '',
                  ownerId: 'epl_2Kb1TimnZGbvHcZCy3AiqX1z7og',
                  description: `${event.description}`,
                  formatId: 'evf_2KamBSqULzzWbGWRd2zRqmlQw5C',
                  videoConfKindId: 'vck_2PKS2zz34QE74HSIZAvb6zjihmn',
                  isPublished: event.isPublished,
                  link: `${event.link}`,
                  place: `${event.place}`,
                  participantsCount: 16,
                },
                {
                  __typename: 'WebinarDTO',
                  id: 'evt_2LPRRhbU4ES3KjmIp8MNuD1DP7s',
                  title: 'Лекции о живописи в библиотеке имени Чехова',
                  kindId: 'evk_2KamBOoYzqdztwSwWisv35jztL1',
                  endAt: '2042-02-27T13:00Z',
                  startAt: '2042-02-27T09:00Z',
                  authorId: '',
                  ownerId: 'epl_2Kb1TimnZGbvHcZCy3AiqX1z7og',
                  description:
                    'Проект «Картина со смыслом» — это цикл лекций об изобразительном искусстве, которые проходят по четвергам. На занятиях слушателям рассказывают о тайных смыслах, зашифрованных в древних полотнах, и интересных фактах из жизни знаменитых художников. Лекторы учат нестандартному взгляду на искусство и дают современную интерпретацию известным картинам. 27 февраля вас ждёт лекция «Петрус Кристус - таинственный иллюзионист».',
                  formatId: 'evf_2KamBSqULzzWbGWRd2zRqmlQw5C',
                  isPublished: false,
                  link: 'https://jazz.sber.ru/rt38p5?psw=OBAYDUpVDAQRAB8bFUEbFx4KAg',
                  place: null,
                  participantsCount: 4,
                },
                {
                  __typename: 'WebinarDTO',
                  id: 'evt_2KiwhtkgGT71w8DmsBHTZhyOhwm',
                  title: 'Лекция "Точка притяжения - как, кем и для кого создаются креативные пространства в городе"',
                  kindId: 'evk_2KamBOoYzqdztwSwWisv35jztL1',
                  endAt: '2044-06-16T12:00Z',
                  startAt: '2044-06-16T11:00Z',
                  authorId: '',
                  ownerId: 'epl_2Kb1TimnZGbvHcZCy3AiqX1z7og',
                  description:
                    'Откуда в городе столько креативных людей, что креативные пространства для них стремительно растут? Или эти пространства с человеческой креативностью не связаны? Тогда зачем это всё? Сколько бы вопросов у вас ни появилось, на каждый из них есть ответ.',
                  formatId: 'evf_2KamBSqULzzWbGWRd2zRqmlQw5C',
                  isPublished: false,
                  link: 'https://jazz.sber.ru/gi4ucw?psw=OEcKVBcPXAMHVw1CSBtLEAhdEA',
                  place: null,
                  participantsCount: 2,
                },
                {
                  __typename: 'WebinarDTO',
                  id: 'evt_2MlqRvJpZ1Zmr5A1GtFIljJeWcq',
                  title: 'Экспозиции главного музейного комплекса Эрмитажа',
                  kindId: 'evk_2KamBOoYzqdztwSwWisv35jztL1',
                  endAt: '2052-04-24T19:00Z',
                  startAt: '2052-04-24T05:00Z',
                  authorId: '',
                  ownerId: 'epl_2Kb1TimnZGbvHcZCy3AiqX1z7og',
                  description:
                    'Акцент этого маршрута сделан на осмотре западноевропейского изобразительного искусства и Картинной галереи Эрмитажа, а также античных коллекций.\n\nВ рамках маршрута можно посетить недавно открытую на третьем этаже Зимнего дворца Запасную галерею европейской живописи XVII–XVIII веков из фондов Государственного Эрмитажа. В составе новой экспозиции, которая охватывает девятнадцать залов, более двухсот произведений европейских художников.\n\nГибкая система маршрутов позволит увидеть почти все богатство экспозиций Главного музейного комплекса. В специальных точках нужно выбрать путь для дальнейшего движения — в зависимости от этого можно посмотреть залы в определенном порядке. Для удобства посетителей установлены соответствующие информационные указатели.',
                  formatId: 'evf_2KamBSyQQez61ZOxG0Ve9Rvvj2Y',
                  isPublished: false,
                  link: null,
                  place: 'г. Санкт-Петербург, Дворцовая пл., д 2',
                  participantsCount: 6,
                },
              ],
              count: 10,
              pageIndex: 0,
              pageSize: 50,
            },
            getEduPlanWebinars3: {
              webinars: [
                {
                  __typename: 'WebinarDTO',
                  id: 'evt_2M2YZj2NL0k2kEdEnbKxCdiAFvw',
                  title: `${event.title}`,
                  kindId: 'evk_2KamBOoYzqdztwSwWisv35jztL1',
                  endAt: `${new CommonHelper().getDateInFormat(event.endAt, DateFormat.yyyyMMddTHHmm0300)}`,
                  startAt: `${new CommonHelper().getDateInFormat(event.startAt, DateFormat.yyyyMMddTHHmm0300)}`,
                  authorId: '',
                  ownerId: 'epl_2Kb1TimnZGbvHcZCy3AiqX1z7og',
                  description: `${event.description}`,
                  formatId: 'evf_2KamBSqULzzWbGWRd2zRqmlQw5C',
                  isPublished: event.isPublished,
                  link: `${event.link}`,
                  videoConfKindId: 'vck_2PKS2zz34QE74HSIZAvb6zjihmn',
                  place: `${event.place}`,
                  participantsCount: 24,
                },
              ],
            },
          },
        };
      case EventAnswer.EMPTY_EVENTS:
        return {
          data: {
            getEduPlanWebinars1: { count: 0 },
            getEduPlanEventKinds: [
              {
                __typename: 'EventKindDTO',
                id: 'evk_2KamBOoYzqdztwSwWisv35jztL1',
                title: 'Вебинар',
                systemCode: 'webinar',
              },
            ],
            getEduPlanWebinars0: { count: 0 },
          },
        };
      case EventAnswer.INCORRECT_FILTERING:
        return {
          data: {
            getEduPlanWebinars1: { count: 1 },
            getEduPlanEventKinds: [
              {
                __typename: 'EventKindDTO',
                id: 'evk_2KamBOoYzqdztwSwWisv35jztL1',
                title: 'Вебинар',
                systemCode: 'webinar',
              },
            ],
            getEduPlanWebinars0: { count: 0 },
            getEduPlanWebinars3: { webinars: [], count: 0, pageIndex: 0, pageSize: 50 },
          },
        };
    }
  }
}
