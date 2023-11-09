import { StudyGroupModel } from '../model/study-group.model';
import { StudentModel } from '../model/student.model';
import { DateFormat } from '../model/enums/dateFormat';
import { CommonHelper } from '../../common.helper';
import { ProgramModel } from '../model/program.model';
import { PlanModel } from '../model/plan.model';
import { StudentAnswer } from '../enum/student.answer.enum';

const helper = new CommonHelper();

export class StudentResponse {
  static readStudentGroups(
    answer = StudentAnswer.SUCCESS,
    group = new StudyGroupModel(),
    program = new ProgramModel(),
    plan = new PlanModel(),
  ): string | unknown {
    switch (answer) {
      default:
        return {
          data: {
            readStudentGroups0: [
              {
                __typename: 'StudentGroup',
                id: 'stg_2UNw8LXFRfpjwKhgBFuqOTkSz2a',
                title: `${group.title}`,
                groupTypeId: 'sgt_2Ff54onmmdVE6BX5qiG31ufH7OJ',
                eduPlanId: 'epl_2SO5QMteAcbMEMemr50ooZXBpDV',
                spaceId: 'spc_2SO5NF4CTovatoUM7plD4fyJdoi',
                studentGroupType: {
                  title: `${group.groupType.name}`,
                },
                edu_plan: {
                  completionPeriodSetting: {
                    completionPeriod: {
                      title: `${plan.competitionPeriod.name}`,
                    },
                  },
                  eduFormSetting: {
                    eduForm: {
                      title: `${plan.eduForm.title}`,
                    },
                  },
                  title: `${plan.title}`,
                  eduProgram: {
                    title: `${program.title}`,
                  },
                  eduStartDate: `${helper.getDateInFormat(plan.eduStartDate, DateFormat.yyyyMMdd)}`,
                  eduTechnologySetting: {
                    eduTechnology: {
                      title: `${plan.eduTechnology.title}`,
                    },
                  },
                  enrollmentYear: plan.enrollmentYear,
                },
              },
              {
                __typename: 'StudentGroup',
                id: 'stg_2UOILKbcx4aZAiI9pNHLoNXznED',
                title: 'Группа 6352',
              },
              {
                __typename: 'StudentGroup',
                id: 'stg_2UOIOcqJqrxo8DbCBzkdFp6ZB5O',
                title: 'Группа 9456',
              },
            ],
            readStudentGroups1: [
              {
                __typename: 'StudentGroup',
                id: 'stg_2UNw8LXFRfpjwKhgBFuqOTkSz2a',
                title: `${group.title}`,
                groupTypeId: 'sgt_2Ff54onmmdVE6BX5qiG31ufH7OJ',
                eduPlanId: 'epl_2SO5QMteAcbMEMemr50ooZXBpDV',
                spaceId: 'spc_2SO5NF4CTovatoUM7plD4fyJdoi',
                studentGroupType: {
                  title: `${group.groupType.name}`,
                },
                edu_plan: {
                  completionPeriodSetting: {
                    completionPeriod: {
                      title: `${plan.competitionPeriod.name}`,
                    },
                  },
                  eduFormSetting: {
                    eduForm: {
                      title: `${plan.eduForm.title}`,
                    },
                  },
                  title: `${plan.title}`,
                  eduProgram: {
                    title: `${program.title}`,
                  },
                  eduStartDate: '2023-08-10',
                  eduTechnologySetting: {
                    eduTechnology: {
                      title: `${plan.eduTechnology.title}`,
                    },
                  },
                  enrollmentYear: plan.enrollmentYear,
                },
              },
            ],
          },
        };
      case StudentAnswer.WITHOUT_GROUPS:
      case StudentAnswer.WITHOUT_GROUPS_AND_STUDENTS:
        return { data: { readStudentGroups0: [] } };
    }
  }

  static addStudent(answer: StudentAnswer): string | unknown {
    switch (answer) {
      default:
        return { data: { addStudent0: { id: 'pr_2UNtra861VmH8S4XmELcsBIXWFO' } } };
      case StudentAnswer.UNIQUE_STUDENT_EMAIL:
        return {
          data: null,
          errors: [
            {
              extensions: {
                classification: 'ValidationError',
                code: 'UNIQUE_VIOLATION',
                constraint: null,
                invalidField: 'email',
              },
              message: 'UNIQUE_VIOLATION',
            },
          ],
        };
    }
  }

  static removeStudentsFromGroup(): string | unknown {
    return { data: { removeStudentsFromGroup0: 1 } };
  }

  static removeStudent(): string | unknown {
    return { data: { removeStudent0: { id: 'pr_2UNtra861VmH8S4XmELcsBIXWFO' } } };
  }

  static removeStudentGroupV(): string | unknown {
    return { data: { removeStudentGroupV20: 'stg_2UNw8LXFRfpjwKhgBFuqOTkSz2a' } };
  }

  static addStudentsToGroup(): string | unknown {
    return { data: { addStudentsToGroup0: 1 } };
  }

  static setStudent(): string | unknown {
    return { data: { setStudent0: { id: 'pr_2UNtra861VmH8S4XmELcsBIXWFO' } } };
  }

  static updateStudentGroup(answer: StudentAnswer): string | unknown {
    switch (answer) {
      default:
        return { data: { updateStudentGroup0: { id: 'stg_2UNw8LXFRfpjwKhgBFuqOTkSz2a' } } };
      case StudentAnswer.UNIQUE_GROUP_TITLE:
        return {
          errors: [
            {
              extensions: {
                code: 'constraint-violation',
                path: '$',
              },
              message:
                'Uniqueness violation. duplicate key value violates unique constraint "unique_student_group_row"',
            },
          ],
        };
    }
  }

  static addStudentGroupV2(answer: StudentAnswer): string | unknown {
    switch (answer) {
      default:
        return { data: { addStudentGroupV20: { id: 'stg_2UNw8LXFRfpjwKhgBFuqOTkSz2a' } } };
      case StudentAnswer.UNIQUE_GROUP_TITLE:
        return {
          data: null,
          errors: [
            {
              extensions: {
                classification: 'ValidationError',
                code: 'UNIQUE_VIOLATION',
                constraint: '',
                invalidField: '',
              },
              message: ' : Составной ключ из полей title, spaceId должен быть уникальным',
            },
          ],
        };
    }
  }

  static getStudent(model: StudentModel): string | unknown {
    return {
      data: {
        getStudent0: {
          groupId: 'stg_2UNw8LXFRfpjwKhgBFuqOTkSz2a',
          studentPerson: {
            user: {
              email: `${model.email}`,
            },
            identityCard: {
              firstName: `${model.firstName}`,
              middleName: `${model.middleName}`,
              lastName: `${model.lastName}`,
              birthDate: `${helper.getDateInFormat(model.birthDate, DateFormat.yyyyMMdd)}`,
              sexId: 'sex_2Ff54kxc5f3PK0DNMRRBLoQ9ogh',
            },
            snilsNumber: `${model.snilsNumber}`,
            innNumber: `${model.innNumber}`,
          },
          personalNumber: `${model.personalNumber}`,
          bookNumber: `${model.bookNumber}`,
          financingSourceId: 'efs_2Ff54ilymr3Im8MGQi2503dac80',
          courseId: 'eplc_2Ff53w0TKmWfmaw6OJ9Q4cAHgWq',
          spaceId: 'spc_2JUdyVimGrMYSMFUPz2H7pd1ABS',
          eduPlanId: 'epl_2Kb1TimnZGbvHcZCy3AiqX1z7og',
        },
      },
    };
  }

  static readStudentGroupTypeSettings(): string | unknown {
    return {
      data: {
        readStudentGroupTypeSettings0: [
          {
            __typename: 'StudentGroupTypeSetting',
            itemId: 'sgt_2Ff54onmmdVE6BX5qiG31ufH7OJ',
            studentGroupType: {
              title: 'Академическая группа',
            },
          },
          {
            __typename: 'StudentGroupTypeSetting',
            itemId: 'sgt_2PLGhJNuIV8ImOnMUC17onW2dA0',
            studentGroupType: {
              title: 'Поток',
            },
          },
        ],
      },
    };
  }

  static readStudents(answer: StudentAnswer, model = new StudentModel()): string | unknown {
    switch (answer) {
      default:
        return {
          data: {
            readStudents0: [
              {
                __typename: 'Student',
                id: 'pr_2UNtra861VmH8S4XmELcsBIXWFO',
                bookNumber: `${model.bookNumber}`,
                groupId: 'stg_2UNw8LXFRfpjwKhgBFuqOTkSz2a',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: `${model.lastName}`,
                        firstName: `${model.firstName}`,
                        middleName: `${model.middleName}`,
                      },
                      user: {
                        email: `${model.email}`,
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtt42xc7zlhgJAVfBgydfVNtd',
                bookNumber: '89050276',
                groupId: null,
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'VonRueden',
                        firstName: 'Jolie',
                        middleName: 'Marlowe',
                      },
                      user: {
                        email: 'studenttestzachery73@yandex.ru',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtswsrKKSg7JAty83NDNMBQok',
                bookNumber: '76382164',
                groupId: null,
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Ledner',
                        firstName: 'Maryjane',
                        middleName: 'Greer',
                      },
                      user: {
                        email: 'studenttestrussel_gleichner@gmail.com',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtsDVVv1bIBuW1hAr2MCxokrP',
                bookNumber: '60664979',
                groupId: null,
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Homenick',
                        firstName: 'Bertha',
                        middleName: 'Hayden',
                      },
                      user: {
                        email: 'studenttestkeith_rowe81@mail.ru',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtt2XaSZYn3kL3A7obDrrZx18',
                bookNumber: '52940662',
                groupId: null,
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Boyer',
                        firstName: 'Amos',
                        middleName: 'Leslie',
                      },
                      user: {
                        email: 'studenttestloy.muller88@yahoo.com',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNttifSYRrSXq7M2gbqTuoUHYN',
                bookNumber: '41880773',
                groupId: null,
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Satterfield',
                        firstName: 'Maggie',
                        middleName: 'Brooklyn',
                      },
                      user: {
                        email: 'studenttestanais_batz10@gmail.com',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNttjLmNyNJZdfPFvoaAEELAei',
                bookNumber: '36303259',
                groupId: null,
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Feest',
                        firstName: 'Micheal',
                        middleName: 'River',
                      },
                      user: {
                        email: 'studenttestbrannon.rogahn73@yahoo.com',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtswfUUvyOHgLJWfkuEmk539n',
                bookNumber: '34831419',
                groupId: null,
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Ratke',
                        firstName: 'Marjolaine',
                        middleName: 'Kai',
                      },
                      user: {
                        email: 'studenttestdaisha_ankunding@yahoo.com',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNttgRdtfhk5dw36qQ0kgVuiU9',
                bookNumber: '22659431',
                groupId: null,
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Dickinson',
                        firstName: 'Beryl',
                        middleName: 'Kyle',
                      },
                      user: {
                        email: 'scroll-case@mail.ru',
                      },
                    },
                  ],
                },
              },
            ],
            readStudentsAggregate0: {
              aggregate: {
                count0: 55,
              },
            },
            readStudents1: [
              {
                __typename: 'Student',
                id: 'pr_2UNtra861VmH8S4XmELcsBIXWFO',
                bookNumber: `${model.bookNumber}`,
                groupId: 'stg_2UNw8LXFRfpjwKhgBFuqOTkSz2a',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: `${model.lastName}`,
                        firstName: `${model.firstName}`,
                        middleName: `${model.middleName}`,
                      },
                      user: {
                        email: `${model.email}`,
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtkPGEXmCZ4x2IsssnhbVywX9',
                bookNumber: '68882774',
                groupId: 'stg_2UNw8LXFRfpjwKhgBFuqOTkSz2a',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Cormier',
                        firstName: 'August',
                        middleName: 'Ryan',
                      },
                      user: {
                        email: 'studenttestdeangelo18@mail.ru',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtrWL9JCsWSE17H6Ydgsny7cG',
                bookNumber: '21831739',
                groupId: 'stg_2UNw8LXFRfpjwKhgBFuqOTkSz2a',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Kuhlman',
                        firstName: 'Keshawn',
                        middleName: 'Ellis',
                      },
                      user: {
                        email: 'studenttestvicenta50@mail.ru',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtrYCjl4wLq2zuKUmG3s1v6py',
                bookNumber: '15211779',
                groupId: 'stg_2UNw8LXFRfpjwKhgBFuqOTkSz2a',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Morar',
                        firstName: 'Trever',
                        middleName: 'Leslie',
                      },
                      user: {
                        email: 'studenttestgust61@gmail.com',
                      },
                    },
                  ],
                },
              },
            ],
            readStudentsAggregate1: {
              aggregate: {
                count0: 4,
              },
            },
            readStudents2: [
              {
                __typename: 'Student',
                id: 'pr_2UNtrZ8A7ZgQHUdEHx5zt5KuCdE',
                bookNumber: '96624245',
                groupId: 'stg_2UOILKbcx4aZAiI9pNHLoNXznED',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Leuschke',
                        firstName: 'Cindy',
                        middleName: 'Leslie',
                      },
                      user: {
                        email: 'studenttestheather_rippin@gmail.com',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNts777OoyPoyY1TDvtlxv24J6',
                bookNumber: '63706518',
                groupId: 'stg_2UOILKbcx4aZAiI9pNHLoNXznED',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Hilpert',
                        firstName: 'Tito',
                        middleName: 'Jaden',
                      },
                      user: {
                        email: 'studenttestalivia_daugherty14@mail.ru',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNts8ql5ic78JpEXXnk0rGb9qZ',
                bookNumber: '41482290',
                groupId: 'stg_2UOILKbcx4aZAiI9pNHLoNXznED',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Ernser',
                        firstName: 'Joe',
                        middleName: 'Ellis',
                      },
                      user: {
                        email: 'studenttesthayden_stracke@yandex.ru',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNts3scHF8OMdA2ZuVphA8TLWA',
                bookNumber: '23374292',
                groupId: 'stg_2UOILKbcx4aZAiI9pNHLoNXznED',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Dach',
                        firstName: 'Ezra',
                        middleName: 'Jordan',
                      },
                      user: {
                        email: 'studenttestalphonso34@hotmail.com',
                      },
                    },
                  ],
                },
              },
            ],
            readStudentsAggregate2: {
              aggregate: {
                count0: 4,
              },
            },
            readStudents3: [],
            readStudentsAggregate3: {
              aggregate: {
                count0: 0,
              },
            },
            readStudents4: [
              {
                __typename: 'Student',
                id: 'pr_2UNtra861VmH8S4XmELcsBIXWFO',
                bookNumber: `${model.bookNumber}`,
                personalNumber: `${model.personalNumber}`,
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: `${model.lastName}`,
                        firstName: `${model.firstName}`,
                        middleName: `${model.middleName}`,
                      },
                      user: {
                        email: `${model.email}`,
                      },
                    },
                  ],
                },
                financingSource: {
                  title: `${model.financing.title}`,
                  shortTitle: `${model.financing.shortTitle}`,
                },
                course_setting: {
                  course: {
                    title: `${model.course.name}`,
                  },
                },
                student_group: null,
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtswfUUvyOHgLJWfkuEmk539n',
                bookNumber: '34831419',
                personalNumber: '48210863',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Ratke',
                        firstName: 'Marjolaine',
                        middleName: 'Kai',
                      },
                      user: {
                        email: 'studenttestdaisha_ankunding@yahoo.com',
                      },
                    },
                  ],
                },
                financingSource: {
                  title: 'По договору об оказании платных образовательных услуг',
                  shortTitle: 'по договору',
                },
                course_setting: {
                  course: {
                    title: '4 курс',
                  },
                },
                student_group: null,
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtswsrKKSg7JAty83NDNMBQok',
                bookNumber: '76382164',
                personalNumber: '67772929',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Ledner',
                        firstName: 'Maryjane',
                        middleName: 'Greer',
                      },
                      user: {
                        email: 'studenttestrussel_gleichner@gmail.com',
                      },
                    },
                  ],
                },
                financingSource: {
                  title: 'По договору об оказании платных образовательных услуг',
                  shortTitle: 'по договору',
                },
                course_setting: {
                  course: {
                    title: '4 курс',
                  },
                },
                student_group: null,
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtt2XaSZYn3kL3A7obDrrZx18',
                bookNumber: '52940662',
                personalNumber: '53768777',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Boyer',
                        firstName: 'Amos',
                        middleName: 'Leslie',
                      },
                      user: {
                        email: 'studenttestloy.muller88@yahoo.com',
                      },
                    },
                  ],
                },
                financingSource: {
                  title: 'По договору об оказании платных образовательных услуг',
                  shortTitle: 'по договору',
                },
                course_setting: {
                  course: {
                    title: '4 курс',
                  },
                },
                student_group: null,
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtt42xc7zlhgJAVfBgydfVNtd',
                bookNumber: '89050276',
                personalNumber: '95567710',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'VonRueden',
                        firstName: 'Jolie',
                        middleName: 'Marlowe',
                      },
                      user: {
                        email: 'studenttestzachery73@yandex.ru',
                      },
                    },
                  ],
                },
                financingSource: {
                  title: 'По договору об оказании платных образовательных услуг',
                  shortTitle: 'по договору',
                },
                course_setting: {
                  course: {
                    title: '4 курс',
                  },
                },
                student_group: null,
              },
              {
                __typename: 'Student',
                id: 'pr_2UNttgRdtfhk5dw36qQ0kgVuiU9',
                bookNumber: '22659431',
                personalNumber: '34902374',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Dickinson',
                        firstName: 'Beryl',
                        middleName: 'Kyle',
                      },
                      user: {
                        email: 'studenttestmarianne14@mail.ru',
                      },
                    },
                  ],
                },
                financingSource: {
                  title: 'По договору об оказании платных образовательных услуг',
                  shortTitle: 'по договору',
                },
                course_setting: {
                  course: {
                    title: '4 курс',
                  },
                },
                student_group: null,
              },
              {
                __typename: 'Student',
                id: 'pr_2UNttifSYRrSXq7M2gbqTuoUHYN',
                bookNumber: '41880773',
                personalNumber: '56461856',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Satterfield',
                        firstName: 'Maggie',
                        middleName: 'Brooklyn',
                      },
                      user: {
                        email: 'studenttestanais_batz10@gmail.com',
                      },
                    },
                  ],
                },
                financingSource: {
                  title: 'По договору об оказании платных образовательных услуг',
                  shortTitle: 'по договору',
                },
                course_setting: {
                  course: {
                    title: '4 курс',
                  },
                },
                student_group: null,
              },
              {
                __typename: 'Student',
                id: 'pr_2UNttjLmNyNJZdfPFvoaAEELAei',
                bookNumber: '36303259',
                personalNumber: '72520192',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Feest',
                        firstName: 'Micheal',
                        middleName: 'River',
                      },
                      user: {
                        email: 'studenttestbrannon.rogahn73@yahoo.com',
                      },
                    },
                  ],
                },
                financingSource: {
                  title: 'По договору об оказании платных образовательных услуг',
                  shortTitle: 'по договору',
                },
                course_setting: {
                  course: {
                    title: '4 курс',
                  },
                },
                student_group: null,
              },
              {
                __typename: 'Student',
                id: 'pr_2UOEf3yDUKItny43clpahsFxt8r',
                bookNumber: null,
                personalNumber: null,
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Збирко',
                        firstName: 'Дмитрий',
                        middleName: 'Николаевич',
                      },
                      user: {
                        email: 'd.zbirko@sbereducation.ru',
                      },
                    },
                  ],
                },
                financingSource: {
                  title: 'Местный бюджет',
                  shortTitle: 'м.бюджет',
                },
                course_setting: null,
                student_group: null,
              },
            ],
          },
        };
      case StudentAnswer.WITHOUT_STUDENTS:
      case StudentAnswer.WITHOUT_GROUPS_AND_STUDENTS:
        return {
          data: {
            readStudents0: [],
            readStudentsAggregate0: {
              aggregate: {
                count0: 0,
              },
            },
          },
        };
      case StudentAnswer.ALL_STUDENTS_IN_GROUP:
        return {
          data: {
            readStudents0: [],
            readStudentsAggregate0: {
              aggregate: {
                count0: 0,
              },
            },
            readStudents1: [],
            readStudentsAggregate1: {
              aggregate: {
                count0: 0,
              },
            },
            readStudents2: [
              {
                __typename: 'Student',
                id: 'pr_2UNtrZ8A7ZgQHUdEHx5zt5KuCdE',
                bookNumber: '96624245',
                groupId: 'stg_2UOILKbcx4aZAiI9pNHLoNXznED',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Leuschke',
                        firstName: 'Cindy',
                        middleName: 'Leslie',
                      },
                      user: {
                        email: 'studenttestheather_rippin@gmail.com',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtt42xc7zlhgJAVfBgydfVNtd',
                bookNumber: '89050276',
                groupId: 'stg_2UOILKbcx4aZAiI9pNHLoNXznED',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'VonRueden',
                        firstName: 'Jolie',
                        middleName: 'Marlowe',
                      },
                      user: {
                        email: 'studenttestzachery73@yandex.ru',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtswsrKKSg7JAty83NDNMBQok',
                bookNumber: '76382164',
                groupId: 'stg_2UOILKbcx4aZAiI9pNHLoNXznED',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Ledner',
                        firstName: 'Maryjane',
                        middleName: 'Greer',
                      },
                      user: {
                        email: 'studenttestrussel_gleichner@gmail.com',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNts777OoyPoyY1TDvtlxv24J6',
                bookNumber: '63706518',
                groupId: 'stg_2UOILKbcx4aZAiI9pNHLoNXznED',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Hilpert',
                        firstName: 'Tito',
                        middleName: 'Jaden',
                      },
                      user: {
                        email: 'studenttestalivia_daugherty14@mail.ru',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtsDVVv1bIBuW1hAr2MCxokrP',
                bookNumber: '60664979',
                groupId: 'stg_2UOILKbcx4aZAiI9pNHLoNXznED',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Homenick',
                        firstName: 'Bertha',
                        middleName: 'Hayden',
                      },
                      user: {
                        email: 'studenttestkeith_rowe81@mail.ru',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtt2XaSZYn3kL3A7obDrrZx18',
                bookNumber: '52940662',
                groupId: 'stg_2UOILKbcx4aZAiI9pNHLoNXznED',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Boyer',
                        firstName: 'Amos',
                        middleName: 'Leslie',
                      },
                      user: {
                        email: 'studenttestloy.muller88@yahoo.com',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNttifSYRrSXq7M2gbqTuoUHYN',
                bookNumber: '41880773',
                groupId: 'stg_2UOILKbcx4aZAiI9pNHLoNXznED',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Satterfield',
                        firstName: 'Maggie',
                        middleName: 'Brooklyn',
                      },
                      user: {
                        email: 'studenttestanais_batz10@gmail.com',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNts8ql5ic78JpEXXnk0rGb9qZ',
                bookNumber: '41482290',
                groupId: 'stg_2UOILKbcx4aZAiI9pNHLoNXznED',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Ernser',
                        firstName: 'Joe',
                        middleName: 'Ellis',
                      },
                      user: {
                        email: 'studenttesthayden_stracke@yandex.ru',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNttjLmNyNJZdfPFvoaAEELAei',
                bookNumber: '36303259',
                groupId: 'stg_2UOILKbcx4aZAiI9pNHLoNXznED',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Feest',
                        firstName: 'Micheal',
                        middleName: 'River',
                      },
                      user: {
                        email: 'studenttestbrannon.rogahn73@yahoo.com',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtswfUUvyOHgLJWfkuEmk539n',
                bookNumber: '34831419',
                groupId: 'stg_2UOILKbcx4aZAiI9pNHLoNXznED',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Ratke',
                        firstName: 'Marjolaine',
                        middleName: 'Kai',
                      },
                      user: {
                        email: 'studenttestdaisha_ankunding@yahoo.com',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNts3scHF8OMdA2ZuVphA8TLWA',
                bookNumber: '23374292',
                groupId: 'stg_2UOILKbcx4aZAiI9pNHLoNXznED',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Dach',
                        firstName: 'Ezra',
                        middleName: 'Jordan',
                      },
                      user: {
                        email: 'studenttestalphonso34@hotmail.com',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNttgRdtfhk5dw36qQ0kgVuiU9',
                bookNumber: '22659431',
                groupId: 'stg_2UOILKbcx4aZAiI9pNHLoNXznED',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Dickinson',
                        firstName: 'Beryl',
                        middleName: 'Kyle',
                      },
                      user: {
                        email: 'studenttestmarianne14@mail.ru',
                      },
                    },
                  ],
                },
              },
            ],
            readStudentsAggregate2: {
              aggregate: {
                count0: 12,
              },
            },
            readStudents3: [
              {
                __typename: 'Student',
                id: 'pr_2UNtra861VmH8S4XmELcsBIXWFO',
                bookNumber: '76284805',
                groupId: 'stg_2UNw8LXFRfpjwKhgBFuqOTkSz2a',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Treutel',
                        firstName: 'Griffin',
                        middleName: 'Shawn',
                      },
                      user: {
                        email: 'studenttestlue.king58@mail.ru',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtkPGEXmCZ4x2IsssnhbVywX9',
                bookNumber: '68882774',
                groupId: 'stg_2UNw8LXFRfpjwKhgBFuqOTkSz2a',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Cormier',
                        firstName: 'August',
                        middleName: 'Ryan',
                      },
                      user: {
                        email: 'studenttestdeangelo18@mail.ru',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtrWL9JCsWSE17H6Ydgsny7cG',
                bookNumber: '21831739',
                groupId: 'stg_2UNw8LXFRfpjwKhgBFuqOTkSz2a',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Kuhlman',
                        firstName: 'Keshawn',
                        middleName: 'Ellis',
                      },
                      user: {
                        email: 'studenttestvicenta50@mail.ru',
                      },
                    },
                  ],
                },
              },
              {
                __typename: 'Student',
                id: 'pr_2UNtrYCjl4wLq2zuKUmG3s1v6py',
                bookNumber: '15211779',
                groupId: 'stg_2UNw8LXFRfpjwKhgBFuqOTkSz2a',
                personRole: {
                  person: [
                    {
                      __typename: 'PersonDTO',
                      identityCard: {
                        lastName: 'Morar',
                        firstName: 'Trever',
                        middleName: 'Leslie',
                      },
                      user: {
                        email: 'studenttestgust61@gmail.com',
                      },
                    },
                  ],
                },
              },
            ],
            readStudentsAggregate3: {
              aggregate: {
                count0: 4,
              },
            },
          },
        };
    }
  }
}
