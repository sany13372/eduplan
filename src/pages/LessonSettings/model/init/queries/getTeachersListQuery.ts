import { Teacher } from '@src/types';
import { query } from '@src/gql-client';
import { isNotEmpty } from '@utils/typescriptUtils';
import { employeeTypeToTeacher } from '@utils/mappers';

type GetTeachersListQueryParams = {
  id: string;
  type: 'linked' | 'unlinked';
};
export const getTeachersListQuery = ({ id, type }: GetTeachersListQueryParams): Teacher[] => {
  const resp =
    query.getImplementationEmployees({
      input: {
        implementationId: id,
        linked: type === 'linked',
      },
    }) ?? [];
  return resp.filter(isNotEmpty).map(employeeTypeToTeacher);
};
