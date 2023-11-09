import { useStore } from 'effector-react';
import { eduPlanDesc } from '@src/pages/Desc/model';
import { EmptyInfo, GroupInfo, GroupInfoContainer, TitleCard } from '@src/pages/Desc/components';
import { Button } from '@kit-edu/button';
import { useHistory } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';
import partial from 'lodash/partial';
import { info } from '@src/pages/Desc/model/constants';

export const ViewDesc = () => {
  const data = useStore(eduPlanDesc.$value);
  const history = useHistory();

  const updateClickHandler = (planId: string) => {
    const path = getPath(MfeRoutes.EDU_PLAN_DESC_EDIT, { ':planId': planId });
    history.push(path);
  };

  const updateClickHandlerPartial = partial(updateClickHandler, data.id);

  return (
    <div className="space-y-8" data-testid="viewDesc">
      <TitleCard title="Данные для витрины образовательных программ">
        <Button size="medium" appearance="black" onClick={updateClickHandlerPartial}>
          Настроить
        </Button>
      </TitleCard>
      {!data.b2b && !data.b2b && <EmptyInfo />}
      {data.b2c && (
        <GroupInfoContainer titleInfo={info.b2c} key="b2c">
          <GroupInfo data={data.b2c} />
        </GroupInfoContainer>
      )}
      {data.b2b && (
        <GroupInfoContainer titleInfo={info.b2b} key="b2b">
          <GroupInfo data={data.b2b} />
        </GroupInfoContainer>
      )}
    </div>
  );
};
