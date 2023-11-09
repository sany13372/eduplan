import { Button } from '@kit-edu/button';
import { setDrawerInfo } from '@src/pages/LessonSettings/model';
import React from 'react';
import { SetDrawerInfoParams } from '@src/pages/LessonSettings/model/types';

export const OpenDrawerButton = ({ type, val }: SetDrawerInfoParams) => {
  const clickHandler = () => {
    setDrawerInfo({ type, val });
  };
  return <Button iconLeftName="master-edit" size="medium" appearance="light-outline" onClick={clickHandler} />;
};
