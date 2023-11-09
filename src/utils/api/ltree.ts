import split from 'lodash/split';

export const parentIdOfPath = (path: string): string | null => {
  // Формат: [...].grand-parent-id.parent-id.item-id

  const parts = split(path, '.');
  return parts.length > 1 ? parts[parts.length - 2] : null;
};
