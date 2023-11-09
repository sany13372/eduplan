import { ActivityRow, IotTemplateRow } from '@src/pages/IotTemplateManagement/model/types';
import React, { ChangeEvent, useMemo } from 'react';
import { Switch } from '@kit-edu/switch';
import { useField } from 'formik';
import escapeRegExp from 'lodash/escapeRegExp';

type TitleCellProps = {
  data: ActivityRow;
};

const filterOptItems = (data: IotTemplateRow[], path?: string): IotTemplateRow[] => {
  if (!path) return data;
  const pattern = `^${escapeRegExp(path)}[.]{1}[a-zA-Z0-9_]*$`;
  const regex = new RegExp(pattern, 'g');
  return data.filter((e) => !e.path.match(regex));
};

export const SwitchCell = ({ data }: TitleCellProps): JSX.Element => {
  const { isGroup } = data;
  const [field, , { setValue }] = useField<IotTemplateRow[]>('rows');
  const isChecked = useMemo(() => Boolean(field.value.find((e) => e.id === data.id)), [data.id, field.value]);

  const removeItem = (id: string) => {
    setValue(
      field.value.filter((el) => el.id !== id),
      false,
    );
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isNew = e.target.checked;
    if (isNew) {
      const isOptModuleItem = data.parentGroupInfo?.componentKind === 'opt-module';
      const vals = isOptModuleItem ? filterOptItems(field.value, data?.parentGroupInfo?.id) : field.value;
      const newItem: IotTemplateRow = {
        id: data.id,
        path: data.path,
      };
      setValue([...vals, newItem]);
    } else removeItem(data.id);
  };

  return <>{!isGroup && <Switch checked={isChecked} onChange={onChange} />}</>;
};
