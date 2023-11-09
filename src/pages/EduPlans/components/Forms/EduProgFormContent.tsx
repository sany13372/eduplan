import { EduProgramInfo } from '@src/pages/EduPlans/model/types';
import { Label } from '@sber-universe/om-component-library';

type EduProgFormContentProps = {
  eduProg: EduProgramInfo;
};
export const EduProgFormContent = ({ eduProg }: EduProgFormContentProps): JSX.Element => {
  const {
    eduProgramKind: { caption: eduProgKindTitle },
    domainOfStudy: { caption: domainOfStudyTitle, systemCode: domainOfStudySystamCode },
    title,
  } = eduProg;

  return (
    <>
      <Label caption="Вид образовательной программы">{eduProgKindTitle}</Label>
      <Label caption="Направление подготовки">{`${domainOfStudySystamCode} ${domainOfStudyTitle}`}</Label>
      <Label caption="Образовательная программа">{title}</Label>
    </>
  );
};
