import { useCallback, useEffect } from 'react';

const useKeydown = (code, callback) => {
  const onKeydown = useCallback((event) => {
    if (event.code === code) { 
      callback();
    }
  }, [code, callback])

  useEffect(() => {
    window.addEventListener('keydown', onKeydown)

    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [onKeydown])
}

export default useKeydown;
