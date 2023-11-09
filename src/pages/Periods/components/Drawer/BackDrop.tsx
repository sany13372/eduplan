/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import classnames from 'classnames';

import styles from './BackDrop.module.css';

type BackDropProps = {
  isVisible: boolean;
  isNested: boolean;
  clickHandler?: () => void;
};
export const BackDrop = ({ isVisible, isNested, clickHandler }: BackDropProps) => {
  if (!isVisible) return null;

  return (
    <div
      onClick={clickHandler}
      className={classnames({
        [styles.backdrop]: true,
        'bg-base-600 bg-opacity-50': !isNested,
        'bg-transparent': isNested,
      })}
    />
  );
};
