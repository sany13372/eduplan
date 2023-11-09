import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { resetMfeBackGround, setMfeBackGround } from '@src/app/model';
import { resetDomainData, semesterListInfo, totalTeacherCount } from '@src/pages/Teachers/model';
import { useStore } from 'effector-react';
import { ScrollArrow } from '@src/components';
import { DeleteTeacher, EmptyList, SemesterInfoPanel } from '@src/pages/Teachers/components';
import { EduPlanParams } from '@constants/routes';
import { AddTeacherDrawer } from '@src/pages/Teachers/components/AddTeacherDrawer';
import { LoadingWrapper } from '@sber-universe/om-component-library';

import './model/init';

export const Teachers = () => {
  const { planId } = useParams<EduPlanParams>();
  const status = useStore(semesterListInfo.$status);
  const data = useStore(semesterListInfo.$value);
  const totalCountStatus = useStore(totalTeacherCount.$status);
  const totalCountValue = useStore(totalTeacherCount.$value);
  const statusList = [status, totalCountStatus];

  useEffect(() => resetDomainData, []);
  useEffect(() => {
    totalTeacherCount.get(planId);
    semesterListInfo.get(planId);
  }, [planId]);

  useEffect(() => {
    setMfeBackGround('gray');
    return resetMfeBackGround;
  }, []);

  return (
    <>
      <div>
        <AddTeacherDrawer />
      </div>
      <LoadingWrapper loadingStatusList={statusList} errorStatusList={statusList}>
        {totalCountValue === 0 && <EmptyList />}
        {totalCountValue > 0 && (
          <>
            <DeleteTeacher />
            <ScrollArrow isDisabled={false}>
              <div data-testid="teachersForm">
                {data.map((e) => (
                  <SemesterInfoPanel data={e} key={e.id} path={e.id} />
                ))}
              </div>
            </ScrollArrow>
          </>
        )}
      </LoadingWrapper>
    </>
  );
};
