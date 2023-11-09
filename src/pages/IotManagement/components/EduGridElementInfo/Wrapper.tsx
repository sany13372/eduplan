import React, { FC } from 'react';
import { EmptyList as InfoPanel } from '@sber-universe/om-component-library';

type WrapperProps = {
  templateCount: number;
  itemsCount: number;
};
const emptyStudentListMessage = 'Для плана обучения не добавлены обучающиеся';
const emptyIotTemplateListMessage =
  'Для части срока освоения не добавлены шаблоны индивидуальных ' +
  'образовательных траекторий, создание индивидуальных образовательных траекторий обучающихся невозможно';

export const Wrapper: FC<WrapperProps> = ({ children, templateCount, itemsCount }): JSX.Element => {
  if (itemsCount === 0 || templateCount === 0) {
    return (
      <>
        {itemsCount === 0 && <InfoPanel content={emptyStudentListMessage} />}
        {templateCount === 0 && <InfoPanel content={emptyIotTemplateListMessage} />}
      </>
    );
  }

  return <>{children}</>;
};
