import { Accordion } from '@sber-universe/om-component-library';
import { EmptyStreamListNotification, StreamInfo } from '@src/pages/LessonSettings/components';
import React from 'react';
import { useStore } from 'effector-react';
import { $streamMapStore } from '@src/pages/LessonSettings/model';
import { Lesson, StreamCountObj } from '@src/pages/LessonSettings/model/types';

type ContentProps = Pick<Lesson, 'id'> & StreamCountObj;
export const Content = ({ id, streamCount }: ContentProps) => {
  const streamMap = useStore($streamMapStore);
  const streamList = streamMap[id] ?? [];

  const streamCountIsEmpty = streamCount === 0;

  return (
    <Accordion.Content>
      {streamCountIsEmpty ? (
        <div className="p-4 rounded-md border border-base-300">
          <EmptyStreamListNotification />
        </div>
      ) : (
        <div>
          {streamList.map((e) => (
            <StreamInfo key={e.id} stream={e} />
          ))}
        </div>
      )}
    </Accordion.Content>
  );
};
