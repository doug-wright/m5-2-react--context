import { useEffect } from 'react';

const useDocumentTitle = (title, fallBackTitle) => {
  useEffect(() => {
    document.title = title;

    return () => {
      document.title = fallBackTitle;
    }
  }, [title, fallBackTitle]);
}

export default useDocumentTitle;
