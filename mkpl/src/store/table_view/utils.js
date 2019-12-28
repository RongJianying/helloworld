import React from 'react';
import debounce from 'lodash/debounce';

// Note: React states that useMemo may release the cached function and recalculate on next render
// but I think it should be 99.9% safe to define the debounce function this way ...
export const useDebouncedCallback = (callback, timeout = 300) => {
  return React.useMemo(() => debounce(callback, timeout), [callback, timeout]);
};

export const useDebouncedValue = (value, timeout = 300) => {
  const [val, setVal] = React.useState(value);
  const debouncedSetVal = useDebouncedCallback(setVal, timeout);

  React.useEffect(() => {
    debouncedSetVal(value);
  }, [value, debouncedSetVal]);

  return val;
};
