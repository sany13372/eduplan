import { EmptyFioFilterResult, EmptyList } from '@src/pages/LessonSettings/components';
import React from 'react';

type EmptyStubProps = {
  hasFilters: boolean;
};
export const EmptyStub = ({ hasFilters }: EmptyStubProps) => {
  return <>{hasFilters ? <EmptyFioFilterResult /> : <EmptyList title="Обучающиеся еще не добавлены" />}</>;
};
