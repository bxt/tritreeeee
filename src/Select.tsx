import { useCallback, Fragment } from 'react';

type SelectProps<T extends string> = {
  values: Record<T, unknown>;
  value: T;
  setValue: (t: T) => void;
};

export const Select = <T extends string>({
  values,
  value,
  setValue,
}: SelectProps<T>) => {
  const onChange = useCallback(
    (event) => {
      setValue(event.target.value as T);
    },
    [setValue],
  );
  return (
    <select value={value} onChange={onChange}>
      {Object.keys(values).map((currentValue) => (
        <option key={currentValue}>{currentValue}</option>
      ))}
    </select>
  );
};

export const ButtonSelect = <T extends string>({
  values,
  value,
  setValue,
}: SelectProps<T>) => {
  const onClick = useCallback(
    (event) => {
      setValue(event.target.value as T);
    },
    [setValue],
  );
  return (
    <>
      {Object.keys(values).map((currentValue) => (
        <Fragment key={currentValue}>
          <> </>
          <button
            disabled={currentValue === value}
            value={currentValue}
            onClick={onClick}
          >
            {currentValue}
          </button>
        </Fragment>
      ))}
    </>
  );
};
