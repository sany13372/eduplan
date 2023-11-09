import { ShortUserInfo } from '@src/pages/StudentGroupList/model/types';
import { Student } from '@src/gql-client';

export const studentToShortUserInfo = ({ personRole, id, bookNumber, groupId }: Student): ShortUserInfo => {
  const person = Array.isArray(personRole.person) && personRole.person.length > 0 ? personRole.person[0] : undefined;

  return {
    id: id ?? '',
    bookNumber: bookNumber ?? '',
    fio: `${person?.identityCard?.lastName ?? ''} ${person?.identityCard?.firstName ?? ''} ${
      person?.identityCard?.middleName ?? ''
    }`,
    email: person?.user?.email ?? '',
    groupId: groupId ?? '',
  };
};
