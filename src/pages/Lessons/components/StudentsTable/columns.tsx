import React from 'react';
import { CellProps, Column } from '@sber-universe/om-component-library';
import { Lesson, StudentInfo } from '@src/pages/Lessons/model/types';
import { SelectAllStudentsCell, SelectStudentCell } from '@src/pages/Lessons/components';

export const studentTableColumns: Column<StudentInfo>[] = [
  {
    Header: 'ФИО',
    accessor: 'fio',
    disableFilters: true,
    disableSortBy: true,
    minWidth: 250,
    width: 250,
    maxWidth: 400,
    Cell: ({ value }: CellProps<StudentInfo>) => {
      return value;
    },
  },
  {
    Header: 'Почта',
    accessor: 'email',
    disableFilters: true,
    disableSortBy: true,
    minWidth: 200,
    width: 200,
    maxWidth: 300,
    Cell: ({ value }: CellProps<StudentInfo>) => {
      return value ?? '';
    },
  },
  {
    Header: 'Курс',
    accessor: 'course',
    disableFilters: true,
    disableSortBy: true,
    minWidth: 150,
    width: 150,
    maxWidth: 200,
    Cell: ({ value }: CellProps<StudentInfo>) => {
      return value ?? '';
    },
  },
  {
    Header: 'Источник финансирования',
    accessor: 'financingSource',
    disableFilters: true,
    disableSortBy: true,
    minWidth: 300,
    width: 300,
    maxWidth: 400,
    Cell: ({ value }: CellProps<StudentInfo>) => {
      return value ?? '';
    },
  },
  {
    Header: 'Зачетная книжка',
    accessor: 'bookNumber',
    disableFilters: true,
    disableSortBy: true,
    minWidth: 200,
    width: 200,
    maxWidth: 200,
    Cell: ({ value }: CellProps<StudentInfo>) => {
      return value ?? '';
    },
  },
  {
    Header: 'Учебная группа',
    accessor: 'group',
    disableFilters: true,
    disableSortBy: true,
    minWidth: 200,
    width: 200,
    maxWidth: 200,
    Cell: ({ value }: CellProps<StudentInfo>) => {
      return value ?? '';
    },
  },
];

export const studentTableColumnsWithSelect = [
  {
    Header: (el: Column<Lesson>) => {
      // @ts-ignore
      const { data } = el;
      return <SelectAllStudentsCell data={data} />;
    },
    id: 'selectColumn',
    minWidth: 0,
    width: 100,
    maxWidth: 100,
    Cell: ({ row }: CellProps<Lesson>) => {
      // @ts-ignore
      return <SelectStudentCell data={row.original} />;
    },
  },
  ...studentTableColumns,
];
