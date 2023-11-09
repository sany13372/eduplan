import { useLocation } from 'react-router-dom';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useStore } from 'effector-react';
import { $mfeBackground, resetMfeBackGround, setMfeBackGround } from '@src/app/model';
import { MfeBackground } from '@src/app/model/types';
import { AbilityContext, updateAbility, useAuth } from '@sber-universe/om-component-library';
import { ConfirmEffectorNodes } from '@utils/effector';
import { useFormikContext } from 'formik';

export const useSearchParam = (name: string): string | null => {
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const value = searchParams.get(name);

  return value;
};

export const useBackgroundClassName = (): string => {
  const backgroundStoreValue = useStore($mfeBackground);
  const bgColor = useMemo(
    () => (backgroundStoreValue === 'gray' ? ' bg-base-200' : ' bg-white'),
    [backgroundStoreValue],
  );
  return bgColor;
};

export const useMfeBackGround = (val: MfeBackground) => {
  useEffect(() => {
    setMfeBackGround(val);
    return resetMfeBackGround;
  }, [val]);
};

export const useAbility = () => {
  const { token, permissions } = useAuth();
  const ability = useContext(AbilityContext);

  useEffect(() => {
    if (token && permissions) {
      updateAbility(ability, permissions);
    }
  }, [token, permissions, ability]);

  return ability;
};

export const useConfirmCallbackWrapped = ({
  callback,
  nodes,
}: {
  callback: () => void;
  nodes: ConfirmEffectorNodes;
}) => {
  const confirmIsRequired = useStore(nodes.$confirmIsRequired);
  const { setShowConfirmDialog } = nodes;

  useEffect(() => {
    nodes.setCallback(callback);
  }, [callback, nodes]);

  const wrappedCallback = useCallback(() => {
    if (confirmIsRequired) setShowConfirmDialog(true);
    else callback();
  }, [callback, confirmIsRequired, setShowConfirmDialog]);
  return wrappedCallback;
};

export const useEnableConfirm = ({ nodes }: { nodes: ConfirmEffectorNodes }) => {
  const { dirty } = useFormikContext();
  useEffect(() => {
    nodes.setConfirmIsRequired(dirty);
  }, [dirty, nodes]);
};
