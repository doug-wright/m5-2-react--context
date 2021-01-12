import { useEffect, useState } from 'react';

const usePersistedState = (defaultValue, keyName) => {
  let initialValue = 0;
  const storedValue = JSON.parse(localStorage.getItem(keyName));

  if (storedValue !== null) {
    initialValue = (storedValue);
  } else {
    initialValue = defaultValue;
  }

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(value));
  }, [keyName, value]);

  return [value, setValue];
}

export default usePersistedState;
