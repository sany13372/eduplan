import { query } from '@src/gql-client';
import { Category } from '@src/pages/ActivityManagement/model/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCategoryListQuery = (eduProgId: string): Category[] => {
  const resp = query.readEduPlanRegistryElemCategorySettings({
    where: {
      _and: [
        {
          _or: [
            {
              isDisabled: {
                _is_null: true,
              },
            },
            {
              isDisabled: {
                _eq: false,
              },
            },
          ],
        },
        {
          space: {
            eduPrograms: {
              id: {
                _eq: eduProgId,
              },
            },
          },
        },
      ],
    },
  });
  // const resp = query.readEduPlanRegistryElementCategories({
  //   where: { _or: [{ deletedAt: { _is_null: true } }] },
  // });
  const categoryList: Category[] = resp
    .map(({ eduPlanRegistryElemCategory }) => ({
      id: eduPlanRegistryElemCategory?.id ?? '',
      caption: eduPlanRegistryElemCategory?.title ?? '',
    }))
    .filter((e) => e.id);

  return categoryList.sort((a, b) => {
    if (a.caption > b.caption) return 1;
    if (a.caption < b.caption) return -1;
    return 0;
  });
};
