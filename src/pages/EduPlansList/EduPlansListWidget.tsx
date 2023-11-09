import '@src/styles/index.css';
import '@sber-universe/om-component-library/dist/styles.css';
import '@src/styles/common.css';
import { EduPlansListDefault, EduPlansListDefaultProps } from '@src/pages/EduPlansList/EduPlanListDefault';

export const EduPlansListWidget = ({ eduProgramId }: EduPlansListDefaultProps) => {
  return (
    <div className={`${process.env.APP_NAME_VERSION} default`}>
      <EduPlansListDefault eduProgramId={eduProgramId} />
    </div>
  );
};
