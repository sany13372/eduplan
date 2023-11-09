import { Icon } from '@kit-edu/icon';
import { Typography } from '@kit-edu/typography';
import { useMemo } from 'react';

type UploadProgressProps = {
  progress: number;
};
export const UploadProgress = ({ progress }: UploadProgressProps): JSX.Element => {
  const isUploaded = useMemo(() => progress === 100, [progress]);
  const progressString = useMemo(() => `${progress.toFixed(2)}%`, [progress]);
  const iconName = useMemo(() => (isUploaded ? 'master-edit' : 'master-upload'), [isUploaded]);
  return (
    <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#21ba72]/70">
      <Icon iconName={iconName} className=" text-white" />
      {isUploaded ? (
        <Typography as="p" size="16px" color="white">
          Обработка...
        </Typography>
      ) : (
        <>
          <Typography as="p" size="16px" color="white">
            Загружено:
          </Typography>
          <Typography as="p" size="16px" color="white" className="w-16">
            {progressString}
          </Typography>
        </>
      )}
    </div>
  );
};
