import { useState, useEffect } from 'react';
import { userSession } from '../utils/auth';

export const useWallet = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSignIn = async () => {
      if (userSession.isSignInPending()) {
        const userData = await userSession.handlePendingSignIn();
        setUserData(userData);
      } else if (userSession.isUserSignedIn()) {
        setUserData(userSession.loadUserData());
      }
      setLoading(false);
    };

    checkSignIn();
  }, []);

  return {
    userData,
    loading,
    isSignedIn: Boolean(userData),
    address: userData?.profile?.stxAddress,
  };
};

export default useWallet;
