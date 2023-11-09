import { StudentsData } from '@src/pages/LessonSettings/model/types';
import { query, StringOperationEnum } from '@src/gql-client';
import { isNotEmpty } from '@utils/typescriptUtils';
import { studentTypeToStudent } from '@src/utils/mappers';

type GetStudentsListQueryParams = {
  id: string;
  type: 'linked' | 'unlinked';
  data: StudentsData;
  fioFilter?: string;
};
export const getStudentsListQuery = ({
  id,
  type,
  data: {
    students: initData,
    pagination: { pageIndex, pageSize },
  },
  fioFilter,
}: GetStudentsListQueryParams): StudentsData => {
  const resp = query.getImplementationStudents({
    implementationId: id,
    pageSize,
    isLinked: type === 'linked',
    pageIndex,
    filter: fioFilter
      ? {
          fullName: { operator: StringOperationEnum.CONTAINS, value: fioFilter },
        }
      : undefined,
  });
  const students = resp?.entities ?? [];
  return {
    students: [...initData, ...students.filter(isNotEmpty).map(studentTypeToStudent)],
    pagination: {
      count: resp?.count ?? 0,
      pageIndex: pageIndex + 1,
      pageSize,
    },
  };
};
