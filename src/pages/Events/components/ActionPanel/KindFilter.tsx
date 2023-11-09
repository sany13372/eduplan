import { ItemProps } from '@kit-edu/selectbox';
import { EventReference } from '@src/pages/Events/model/types';
import { useMemo } from 'react';
import { setKindFilter } from '@src/pages/Events/model';
import { ComboBox } from '@src/components';
import { useMediaQuery } from '@sber-universe/om-component-library';

type KindFilterProps = { kinds: EventReference[] };
export const KindFilter = ({ kinds }: KindFilterProps) => {
  const selectedItem = useMemo(() => kinds.find((e) => e.isSelected) ?? null, [kinds]);
  const selectHandler = (item: ItemProps) => {
    setKindFilter(item as EventReference);
  };
  const isMobile = useMediaQuery({ type: 'down', breakpoint: 'md' });
  return (
    <ComboBox
      fullWidth
      size="large"
      placement="bottom-start"
      selected={selectedItem}
      setSelected={selectHandler}
      maxHeight={256}
      minWidth={240}
      placeholder="Выберите вид"
      items={kinds}
      matchWidth={isMobile}
      dataTestId="kindFilter"
    />
  );
};
