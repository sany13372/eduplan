export function arrayIncludes<Value, ArrayElement extends Value>(
  array: ReadonlyArray<ArrayElement>,
  value: Value,
): value is ArrayElement {
  return array.includes(value as ArrayElement);
}
