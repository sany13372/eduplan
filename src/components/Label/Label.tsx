import React, {FC, ReactNode} from "react";
import classNames from "classnames";
import {Typography} from "@kit-edu/typography";

interface Props {
  children: ReactNode;
  required?: boolean;
  className?: string;
  caption?: string;
}
export const Label: FC<Props> = ({
  caption,
  required,
  className,
  children
}) => (
  <div className={classNames('flex items-center gap-4', className)}>
    <div className='w-1/3'>
      <Typography color='dark' fontWeight='semibold' size='14px'>{caption}</Typography>
      {required && <Typography as='p' color='medium' size='12px'>Обязательное</Typography>}
    </div>
    <div className='w-2/3'>{children}</div>
  </div>
);
