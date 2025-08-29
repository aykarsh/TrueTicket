import React, { useEffect, useState } from 'react';
import { useConnect } from '@stacks/connect-react';
import { userSession, signUserOut } from '../utils/auth';

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

  const { doOpenAuth } = useConnect();
  const handleConnect = () => {
    doOpenAuth();
  };

  const handleSignOut = () => {
    signUserOut();
  };

  if (userData) {
    // stxAddress can be a string or an object (mainnet/testnet)
    let address = '';
    if (typeof userData.profile.stxAddress === 'string') {
      address = userData.profile.stxAddress;
    } else if (typeof userData.profile.stxAddress === 'object' && userData.profile.stxAddress !== null) {
      // Prefer testnet if available, else mainnet, else first value
      address = userData.profile.stxAddress.testnet || userData.profile.stxAddress.mainnet || Object.values(userData.profile.stxAddress)[0] || '';
    }
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">
          {address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : 'Wallet Connected'}
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
