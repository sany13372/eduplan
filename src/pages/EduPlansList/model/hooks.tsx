import { CellProps, Column } from '@sber-universe/om-component-library';
import { EduPlanShortInfo } from '@src/pages/EduPlansList/model/types';
import React, { useMemo } from 'react';
import { Typography } from '@kit-edu/typography';
import { ActionsButtonGroup, TitleLinkButton } from '@src/pages/EduPlansList/components';

export const useEduPlanListColumns = ({ withActions }: { withActions: boolean }): Column<EduPlanShortInfo>[] => {
  return useMemo(() => {
    const cols: Column<EduPlanShortInfo>[] = [
      {
        Header: 'Название',
        accessor: 'title',
        disableFilters: true,
        disableSortBy: true,
        width: 250,
        minWidth: 250,
        maxWidth: 600,
        Cell: ({ row }: CellProps<EduPlanShortInfo>) => {
          return <TitleLinkButton item={row.original} />;
        },
      },
      {
        Header: 'Форма обучения',
        accessor: (val: EduPlanShortInfo) => val.eduForm.caption ?? '',
        disableFilters: true,
        disableSortBy: true,
        width: '10%',
        Cell: ({ value }: CellProps<EduPlanShortInfo>) => {
          return (
            <Typography as="p" size="14px">
              {value}
            </Typography>
          );
        },
      },
      {
        Header: 'Технология обучения',
        accessor: (val: EduPlanShortInfo) => val.eduTechnology.caption ?? '',
        disableFilters: true,
        disableSortBy: true,
        width: '10%',
        Cell: ({ value }: CellProps<EduPlanShortInfo>) => {
          return (
            <Typography as="p" size="14px">
              {value}
            </Typography>
          );
        },
      },
      {
        Header: 'Срок освоения',
        accessor: (val: EduPlanShortInfo) => val.competitionPeriod.caption ?? '',
        disableFilters: true,
        disableSortBy: true,
        width: '10%',
        Cell: ({ value }: CellProps<EduPlanShortInfo>) => {
          return (
            <Typography as="p" size="14px">
              {value}
            </Typography>
          );
        },
      },
      {
        Header: 'Год набора',
        accessor: 'enrollmentYear',
        disableFilters: true,
        disableSortBy: true,
        width: '10%',
        Cell: ({ row }: CellProps<EduPlanShortInfo>) => {
          return (
            <Typography as="p" size="14px">
              {row.original?.enrollmentYear && `${row.original.enrollmentYear} год`}
            </Typography>
          );
        },
      },

      {
        Header: 'Дата начала обучения',
        accessor: 'eduStartDate',
        disableFilters: true,
        disableSortBy: true,
        width: '10%',
        Cell: ({ row }: CellProps<EduPlanShortInfo>) => {
          return (
            <Typography as="p" size="14px">
              {row.original.eduStartDate?.toLocaleDateString()}
            </Typography>
          );
        },
      },
    ];
    if (withActions)
      cols.push({
        Header: '',
        id: 'actions',
        disableFilters: true,
        disableSortBy: true,
        width: '10%',
        Cell: ({ row }: CellProps<EduPlanShortInfo>) => {
          const {
            original: { id },
          } = row;
          return <ActionsButtonGroup id={id} />;
        },
      });
    return cols;
  }, [withActions]);
};
