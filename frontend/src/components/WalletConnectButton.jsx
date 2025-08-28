import React, { useEffect, useState } from 'react';
import { connectWallet, userSession, signUserOut } from '../utils/auth';

const WalletConnectButton = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  const handleConnect = () => {
    connectWallet();
  };

  const handleSignOut = () => {
    signUserOut();
  };

  if (userData) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">
          {userData.profile.stxAddress.substring(0, 6)}...
          {userData.profile.stxAddress.substring(
            userData.profile.stxAddress.length - 4
          )}
        </span>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
    >
      Connect Wallet
    </button>
  );
};

export default WalletConnectButton;
