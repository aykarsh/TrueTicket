import React, { useEffect, useState } from 'react';
import { userSession, signUserOut } from '../src/utils/auth';
import { useConnect } from '@stacks/connect-react';
import { LogIn, LogOut } from 'lucide-react';


const WalletConnectButton = () => {
  const [userData, setUserData] = useState(null);
  const { doOpenAuth } = useConnect();

  useEffect(() => {
    const checkSession = () => {
      if (userSession.isSignInPending()) {
        userSession.handlePendingSignIn().then((userData) => {
          setUserData(userData);
        });
      } else if (userSession.isUserSignedIn()) {
        setUserData(userSession.loadUserData());
      } else {
        setUserData(null);

      }
    };
    checkSession();
    document.addEventListener('visibilitychange', checkSession);
    return () => {
      document.removeEventListener('visibilitychange', checkSession);
    };
  }, []);

  let address = '';
  if (userData && userData.profile && userData.profile.stxAddress) {
    if (typeof userData.profile.stxAddress === 'object' && userData.profile.stxAddress !== null) {
      address = userData.profile.stxAddress.testnet || userData.profile.stxAddress.mainnet || '';
    } else if (typeof userData.profile.stxAddress === 'string') {
      address = userData.profile.stxAddress;
    }
  }

  return (
    <div>
      {userData && typeof address === 'string' && address.length > 10 ? (
        <div className="flex items-center gap-2">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-mono">
            {address.substring(0, 6)}...{address.substring(address.length - 4)}
          </span>
          <button
            className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition"
            onClick={signUserOut}
            title="Disconnect Wallet"
          >
            <LogOut size={18} />
          </button>
        </div>
      ) : (
        <button
          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow"
          onClick={() => doOpenAuth({ onFinish: () => window.location.reload() })}
        >
          <LogIn size={18} /> Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnectButton;