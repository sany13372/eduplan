export class DirectoryResponse {
  static readSexSettings(): string | unknown {
    return {
      data: {
        readSexSettings0: [
          {
            __typename: 'SexSetting',
            itemId: 'sex_2Ff54iBOFyYQM9DrgkHhGMHy5u5',
            sex: {
              title: 'Мужской',
            },
          },
          {
            __typename: 'SexSetting',
            itemId: 'sex_2Ff54kxc5f3PK0DNMRRBLoQ9ogh',
            sex: {
              title: 'Женский',
            },
          },
        ],
      },
    };
  }

  static readCourseSettings(): string | unknown {
    return {
      data: {
        readCourseSettings0: [
          {
            __typename: 'CourseSetting',
            itemId: 'eplc_2Ff53p5VEKfxsZJmkCDZqwqLwI0',
            course: {
              title: '6 курс',
            },
          },
          {
            __typename: 'CourseSetting',
            itemId: 'eplc_2Ff53qpgpGZcyfhFq1CZ2OaWlkU',
            course: {
              title: '7 курс',
            },
          },
          {
            __typename: 'CourseSetting',
            itemId: 'eplc_2Ff53rgfnBF6BXbcEtogmWZhvsk',
            course: {
              title: '1 курс',
            },
          },
          {
            __typename: 'CourseSetting',
            itemId: 'eplc_2Ff53tH510eGaDWDlUIEOpwLiQY',
            course: {
              title: '5 курс',
            },
          },
          {
            __typename: 'CourseSetting',
            itemId: 'eplc_2Ff53ukuMhzctDUZhinPrIOegt1',
            course: {
              title: '3 курс',
            },
          },
          {
            __typename: 'CourseSetting',
            itemId: 'eplc_2Ff53vx8Ex3exM9ipbyBk7ATSHS',
            course: {
              title: '4 курс',
            },
          },
          {
            __typename: 'CourseSetting',
            itemId: 'eplc_2Ff53w0TKmWfmaw6OJ9Q4cAHgWq',
            course: {
              title: '2 курс',
            },
          },
        ],
      },
    };
  }

  static readEduFinancingSourceSettings(): string | unknown {
    return {
      data: {
        readEduFinancingSourceSettings0: [
          {
            __typename: 'EduFinancingSourceSetting',
            itemId: 'efs_2Ff54ilymr3Im8MGQi2503dac80',
            eduFinancingSource: {
              title: 'Региональный бюджет',
            },
          },
          {
            __typename: 'EduFinancingSourceSetting',
            itemId: 'efs_2Ff54jHn3YHrrvZvuEQ0M3bPrZK',
            eduFinancingSource: {
              title: 'По договору об оказании платных образовательных услуг',
            },
          },
          {
            __typename: 'EduFinancingSourceSetting',
            itemId: 'efs_2Ff54kSWtdPnD2I8swYjdLWIFGr',
            eduFinancingSource: {
              title: 'Федеральный бюджет',
            },
          },
          {
            __typename: 'EduFinancingSourceSetting',
            itemId: 'efs_2Ff54nZ6FwO7dPxnw2b5zI7XFza',
            eduFinancingSource: {
              title: 'Местный бюджет',
            },
          },
        ],
      },
    };
  }
}
