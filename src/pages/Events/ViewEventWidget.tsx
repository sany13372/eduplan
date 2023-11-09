/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react';
import '@src/styles/index.css';
import '@sber-universe/om-component-library/dist/styles.css';
import '@src/styles/common.css';
import { ViewEventDefault, ViewEventDefaultProps } from '@src/pages/Events/ViewEventDefault';
import './model/init';

export const ViewEventWidget = ({ onTabChange, onInfoUpdate, background, isOnlyView }: ViewEventDefaultProps) => {
  return (
    <div className={`${process.env.APP_NAME_VERSION} default`}>
      <ViewEventDefault
        isOnlyView={isOnlyView}
        background={background}
        onInfoUpdate={onInfoUpdate}
        onTabChange={onTabChange}
      />
    </div>
  );
};
