import { useStore } from 'effector-react';
import { $selectedImpls } from '@src/pages/Lessons/model/index';
import { useMemo } from 'react';

export const useSelectedImpls = (themeId: string): string[] => {
  const allSelectedImpls = useStore($selectedImpls);
  const selectedImpls = useMemo(() => allSelectedImpls[themeId] ?? [], [allSelectedImpls, themeId]);

  return selectedImpls;
};
