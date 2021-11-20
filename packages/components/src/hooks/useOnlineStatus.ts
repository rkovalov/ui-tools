import { useState, useEffect, useCallback } from 'react';

const getOnlineStatus = () => {
  return typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' ? navigator.onLine : true;
};

function useOnlineStatus(): boolean {
  const [onlineStatus, setOnlineStatus] = useState(getOnlineStatus());

  const goOnline = useCallback(() => setOnlineStatus(true), []);

  const goOffline = useCallback(() => setOnlineStatus(false), []);

  useEffect(() => {
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return onlineStatus;
}

export default useOnlineStatus;
