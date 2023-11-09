import { Button } from '@kit-edu/button';
import React from 'react';

export type FormButtonGroupProps = {
  submitLabel?: string;
  resetLabel?: string;
  onReset: () => void;
  isLoading?: boolean;
  isLoadingLabel?: string;
  contentWrapperClassName?: string;
  withoutSidebar?: boolean;
  submitIsDisabled?: boolean;
};
export const FormButtonGroup = ({
  submitLabel = 'Сохранить',
  resetLabel = 'Отмена',
  onReset,
  isLoading,
  isLoadingLabel = 'Отправляется...',
  submitIsDisabled = false,
  contentWrapperClassName = '',
  withoutSidebar,
}: FormButtonGroupProps) => {
  return (
    <div className="h-[100px]">
      <div className={`fixed  left-0  ${withoutSidebar ? ' ' : 'xl:pl-sidebar'} bottom-0 w-full bg-white z-20`}>
        <div
          className={`${
            withoutSidebar ? 'px-6 ' : 'container '
          } py-5 flex items-center justify-end space-x-4 ${contentWrapperClassName}`}
        >
          <Button size="large" appearance="dark-outline" onClick={onReset}>
            {resetLabel}
          </Button>
          <Button size="large" type="submit" loading={isLoading} disabled={submitIsDisabled}>
            {isLoading ? isLoadingLabel : submitLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
