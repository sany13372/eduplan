import { Switch } from '@kit-edu/switch';
import React, { useMemo } from 'react';
import { isValid } from 'date-fns';
import { publicateEvent } from '@src/pages/Events/model';

export type PublicateSwitchProps = { id: string; isPublished: boolean; endDate?: string };

export const PublicateSwitch = ({ id, isPublished, endDate }: PublicateSwitchProps) => {
  const isDisabled = useMemo(
    () => Boolean(endDate && isValid(new Date(endDate)) && new Date(endDate).getTime() <= new Date().getTime()),
    [endDate],
  );
  const publicateClickHandler = () => {
    publicateEvent({ id, isPublished: !isPublished });
  };

  const preventBubbling = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div onClick={preventBubbling}>
      <Switch
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
        checked={isPublished}
        disabled={isDisabled}
        onChange={publicateClickHandler}
        label="Опубликовать"
      />
    </div>
  );
};
