import { query } from '@src/gql-client';
import { ComponentKind } from '@src/pages/ActivityManagement/model/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getComponentKindListQuery = (eduProgId: string): ComponentKind[] => {
  const resp = query.readEduPlanComponentKindSettings({
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
  const componentKindList: ComponentKind[] = resp
    .map(({ eduPlanComponentKindSetting }) => ({
      id: eduPlanComponentKindSetting?.id ?? '',
      caption: eduPlanComponentKindSetting?.title ?? '',
    }))
    .filter((e) => e.id);

  return componentKindList.sort((a, b) => {
    if (a.caption > b.caption) return 1;
    if (a.caption < b.caption) return -1;
    return 0;
  });
};
