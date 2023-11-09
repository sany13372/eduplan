import { StudentAnswer } from '../enum/student.answer.enum';

export class SpaceResponse {
  static getSpaceTenants(answer = StudentAnswer.SUCCESS): string | unknown {
    switch (answer) {
      default:
        return {
          data: {
            getSpaceTenants0: [
              {
                __typename: 'SpaceTenantType',
                spaceTenantRoles: [
                  {
                    __typename: 'RoleType',
                    name: 'author',
                  },
                  {
                    __typename: 'RoleType',
                    name: 'edu_program_admin',
                  },
                ],
              },
              {
                __typename: 'SpaceTenantType',
                spaceTenantRoles: [
                  {
                    __typename: 'RoleType',
                    name: 'student',
                  },
                  {
                    __typename: 'RoleType',
                    name: 'teacher',
                  },
                  {
                    __typename: 'RoleType',
                    name: 'author',
                  },
                  {
                    __typename: 'RoleType',
                    name: 'edu_program_admin',
                  },
                  {
                    __typename: 'RoleType',
                    name: 'space_admin',
                  },
                ],
              },
            ],
          },
        };
      case StudentAnswer.WITHOUT_STUDENT_ROLE:
        return {
          data: {
            getSpaceTenants0: [
              {
                __typename: 'SpaceTenantType',
                spaceTenantRoles: [
                  {
                    __typename: 'RoleType',
                    name: 'teacher',
                  },
                  {
                    __typename: 'RoleType',
                    name: 'author',
                  },
                  {
                    __typename: 'RoleType',
                    name: 'edu_program_admin',
                  },
                  {
                    __typename: 'RoleType',
                    name: 'space_admin',
                  },
                ],
              },
            ],
          },
        };
    }
  }
}
