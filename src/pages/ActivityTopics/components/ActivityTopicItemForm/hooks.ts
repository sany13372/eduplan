// NOTE: Скопировано 1-к-1 из component-library, т.к. эти хуки пока не доступны публично.

import { useRef, useEffect } from 'react';
import { useFormikContext, getIn, setIn, FieldInputProps, FieldMetaProps } from 'formik';

export const usePrevious = <T>(value: T): T => {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

// За основу взято решение предложенное по ссылке:
// https://gist.github.com/donaldpipowitch/4f3989edb2aadd9e44c2856c65e90b2e

export const useFieldError = <TValue>(field: FieldInputProps<TValue>, meta: FieldMetaProps<TValue>) => {
  const { submitCount, status, setStatus } = useFormikContext();
  const prevValue = usePrevious(field.value);

  const clientError = meta.error;
  const showClientError = Boolean((meta.touched || submitCount) && clientError);

  const serverError: string | undefined = getIn(status, field.name);
  const showServerError = !!serverError;
  const error = serverError || clientError;
  const showError = showServerError || showClientError;

  useEffect(() => {
    if (serverError && field.value !== prevValue) {
      setStatus(setIn(status, field.name, undefined));
    }
  }, [serverError, field.value, prevValue, setStatus, status, field.name]);

  return [showError, error] as const;
};
