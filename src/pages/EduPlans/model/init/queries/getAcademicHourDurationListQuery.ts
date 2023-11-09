import { query } from '@src/gql-client';
import { AcademicHourDuration } from '@src/pages/EduPlans/model/types';

export const getAcademicHourDurationListQuery = (eduProgId: string): AcademicHourDuration[] => {
  const resp = query.readAcademicHourDurationSettings({
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
  const academicHourDurationList: AcademicHourDuration[] = resp
    .map(({ academicHourDuration }) => ({
      id: academicHourDuration?.id ?? '',
      caption: academicHourDuration?.title ?? '',
    }))
    .filter((e) => e.id);

  return academicHourDurationList.sort((a, b) => {
    if (a.caption > b.caption) return 1;
    if (a.caption < b.caption) return -1;
    return 0;
  });
};
