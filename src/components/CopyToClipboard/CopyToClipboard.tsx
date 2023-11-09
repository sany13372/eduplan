import { openSuccessToast } from '@utils/helpers/toast';
import { ReactComponent as LinkIcon } from '@src/assets/icons/common/linkIcon.svg';
import { Button } from '@kit-edu/button';
import React from 'react';
import { Badge } from '@sber-universe/om-component-library';

type CopyToClipboardProps = {
  text?: string;
  withIcon?: boolean;
  successMessage?: string;
  badgeText?: string;
  error?: React.ReactNode;
  dataTestId?: string;
};
export const CopyToClipboard = ({
  text,
  withIcon = true,
  successMessage = 'Ссылка успешно скопирована',
  badgeText,
  error,
  dataTestId = 'copy-to-clipboard',
}: CopyToClipboardProps) => {
  const copyClickHandler = () => {
    if (navigator && navigator.clipboard && text) {
      navigator.clipboard.writeText(text);
      openSuccessToast(successMessage);
    }
  };
  return (
    <div
      className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-[30px] lg:items-center"
      data-testid={dataTestId}
    >
      {(withIcon || badgeText) && (
        <div className="flex space-x-[30px] items-center">
          {withIcon && <LinkIcon className="flex-shrink-0" />}
          {badgeText && (
            <Badge size="small" appearance="gray-solid">
              {badgeText}
            </Badge>
          )}
        </div>
      )}
      {!error && (
        <div className="flex space-x-[30px] items-center justify-between min-w-0">
          <a href={text} target="_blank" rel="noreferrer" className="underline text-ellipsis overflow-hidden">
            {text}
          </a>
          {navigator && navigator.clipboard && (
            <Button
              iconLeftName="master-duplicate"
              size="medium"
              appearance="dark-outline"
              onClick={copyClickHandler}
            />
          )}
        </div>
      )}
      {error}
    </div>
  );
};
