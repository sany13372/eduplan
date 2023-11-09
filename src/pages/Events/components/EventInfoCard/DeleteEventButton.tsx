import React from 'react';
import { setDeleteItem } from '@src/pages/Events/model';
import { Tooltip } from '@kit-edu/tooltip';
import { Typography } from '@kit-edu/typography';
import { Button } from '@kit-edu/button';

export type DeleteEventButtonProps = { id: string; isPublished: boolean };

export const DeleteEventButton = ({ id, isPublished }: DeleteEventButtonProps) => {
  const deleteClickHandler = () => {
    setDeleteItem(id);
  };

  const preventBubbling = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  return (
    <Tooltip
      disabled={!isPublished ? true : undefined}
      content={
        <Typography as="p" className="w-40" size="12px">
          Нельзя удалить опубликованное событие.
        </Typography>
      }
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={preventBubbling}>
        <Button
          aria-label="remove"
          appearance="dark-outline"
          disabled={isPublished}
          onClick={deleteClickHandler}
          shape="circular"
          size="medium"
          className="w-10"
          iconLeftName="master-master-delete"
        />
      </div>
    </Tooltip>
  );
};
