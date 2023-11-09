import React from 'react';
import { ActivityInfo as ActivityInfoT } from '@src/pages/Teachers/model/types';
import { useStore } from 'effector-react';
import { totalTeacherCount } from '@src/pages/Teachers/model';
import { TeacherInfoCard } from '@src/pages/Teachers/components';

import { ActivityPanel } from './ActivityPanel';

type ActivityInfoProps = {
  data: ActivityInfoT;
  path: string;
};

export const ActivityInfo = ({ data, path }: ActivityInfoProps) => {
  const totalTeacherCountVal = useStore(totalTeacherCount.$value);
  return (
    <div className="flex flex-col space-y-2" data-testid="activityBlock">
      <ActivityPanel
        title={data.name}
        totalTeacherCount={totalTeacherCountVal}
        teacherCount={data.teacherList.length}
        path={path}
      />
      <div className="flex flex-wrap grid grid-cols-4	sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
        {data.teacherList.map((e) => (
          <TeacherInfoCard data={e} key={e.id} path={`${path}.${e.id}`} />
        ))}
      </div>
    </div>
  );
};
