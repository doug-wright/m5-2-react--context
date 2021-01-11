import { useEffect, useState } from 'react';

const usePersistedState = (defaultValue, keyName) => {
  let initialValue = 0;
  const storedValue = localStorage.getItem(keyName);

  if (storedValue !== null) {
    initialValue = Number(storedValue);
  } else {
    initialValue = defaultValue;
  }

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(keyName, value);
  }, [keyName, value]);

  return [value, setValue];
}

export default usePersistedState;
