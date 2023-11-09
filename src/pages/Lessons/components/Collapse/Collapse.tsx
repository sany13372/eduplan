import React, { Children, cloneElement, useState, ReactElement, useMemo } from 'react';

import { TPanelProps, StickyPosition } from './Panel';

const defaultPosition: StickyPosition = { top: 0 };

type State = 'expanded' | 'collapsed';
type CollapseProps = {
  children: ReactElement<TPanelProps> | ReactElement<TPanelProps>[];
  defaultState?: State;
  sticky?: boolean | StickyPosition;
};
export const Collapse = ({ children, defaultState = 'collapsed', sticky = false }: CollapseProps): JSX.Element => {
  const [collapsedIds, setCollapsedIds] = useState<Record<string, boolean>>({});
  const arrayChildren = Children.toArray(children);

  const defaultStateValue = useMemo(() => defaultState === 'collapsed', [defaultState]);

  const getValue = (key: string | number) => (collapsedIds[key] == null ? defaultStateValue : collapsedIds[key]);

  const handleClick = (key: string | number) => {
    setCollapsedIds((state) => ({
      ...state,
      [key]: !getValue(key),
    }));
  };

  let position: StickyPosition | undefined;

  if (sticky) {
    position = typeof sticky === 'object' ? sticky : defaultPosition;
  }

  return (
    <div className="space-y-2">
      {Children.map(arrayChildren, (child, index) => {
        if (React.isValidElement(child)) {
          return cloneElement(child, {
            // @ts-ignore
            id: index,
            isCollapsed: getValue(index),
            onClickCollapseButton: handleClick,
            sticky: position,
          });
        }
        return undefined;
      })}
    </div>
  );
};
