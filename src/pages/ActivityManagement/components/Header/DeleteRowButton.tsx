import { Button } from '@kit-edu/button';
import { deleteRow } from '@src/pages/ActivityManagement/model';

type DeleteRowButtonProps = {
  id: string;
};
export const DeleteRowButton = ({ id }: DeleteRowButtonProps) => {
  const onClick = () => deleteRow.setItem({ id });

  return (
    <>
      <Button iconLeftName="master-master-delete" size="medium" appearance="white" onClick={onClick} />
    </>
  );
};
