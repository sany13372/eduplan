import { Skeleton } from '@kit-edu/skeleton';
import classNames from 'classnames';

type RowListSkeletonProps = {
  commonClassName?: string;
};

export const RowListSkeleton = ({ commonClassName = '' }: RowListSkeletonProps) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <Skeleton className={classNames(commonClassName, 'col-span-2')} />
      <Skeleton className={classNames(commonClassName, 'col-span-4')} />
      <Skeleton className={classNames(commonClassName, 'col-span-2')} />
      <Skeleton className={classNames(commonClassName, 'col-span-3')} />
      <Skeleton className={classNames(commonClassName, 'col-span-1')} />
    </div>
  );
};
