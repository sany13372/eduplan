import { Form, useFormikContext } from 'formik';
import { ComboBox, Input, Label } from '@sber-universe/om-component-library';
import React from 'react';
import { FormButtonGroup } from '@src/components';
import { CreateGroupInfo, EduGroupType } from '@src/pages/StudentGroupList/model/types';
import { Typography } from '@kit-edu/typography';

export type GroupFormContentProps = {
  groupTypes: EduGroupType[];
  groupTypesChangeAvailable: boolean;
  onReset: () => void;
};

export const GroupFormContent = ({
  groupTypesChangeAvailable,
  groupTypes,
  onReset,
}: GroupFormContentProps): JSX.Element => {
  const { dirty } = useFormikContext();
  return (
    <Form>
        {groupTypes.length > 0 &&
            <>
                <Typography as="h3" size="12px" className="mb-2">
                    Тип группы
                </Typography>
                <div className="mb-6">
                    <ComboBox<CreateGroupInfo>
                        name="groupType"
                        placeholder="Выберите тип группы"
                        items={groupTypes}
                        disabled={!groupTypesChangeAvailable}
                        fullWidth
                        // @ts-ignore
                        matchWidth
                    />
                </div>
            </>
        }
      <Typography as="h3" size="12px" className="mb-2">
        Название группы
      </Typography>
      <Input<CreateGroupInfo> name="title" placeholder="Укажите название группы" />
      <FormButtonGroup contentWrapperClassName="px-9" submitIsDisabled={!dirty} onReset={onReset} />
    </Form>
  );
};
