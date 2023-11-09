import isNil from 'lodash/isNil';

export function isNotEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return !isNil(value);
}
