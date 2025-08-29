
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { Connect } from '@stacks/connect-react';

// Configure app details and network
const appConfig = {
  name: 'TrueTicket',
  icon: window.location.origin + '/logo.png',
  appDetails: {
    name: 'TrueTicket',
    icon: window.location.origin + '/logo.png',
  },
};

// Configure network with auth options
const network = {
  coreApiUrl: 'https://stacks-node-api.testnet.stacks.co',
  chainId: 2147483648, // testnet chain ID
  authOrigin: 'https://stacks-node-api.testnet.stacks.co',
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Connect 
      authOptions={{
        appDetails: appConfig.appDetails,
        redirectTo: '/',
        onFinish: () => {
          window.location.reload();
        },
      }}
      network={network}
    >
      <App />
    </Connect>
  </StrictMode>
);
