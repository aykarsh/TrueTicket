import { AppConfig, UserSession } from '@stacks/connect';

// Configure the app
export const appConfig = new AppConfig(['store_write', 'publish_data']);

// Create UserSession
export const userSession = new UserSession({ appConfig });

// App details for the wallet
export const appDetails = {
  name: 'TrueTicket',
  icon: '/logo.png', // Make sure to add your logo in the public folder
};


// Function to check if user is signed in
export const isUserSignedIn = () => {
  return userSession.isUserSignedIn();
};

// Function to get user data
export const getUserData = () => {
  if (isUserSignedIn()) {
    return userSession.loadUserData();
  }
  return null;
};

// Function to sign out
export const signUserOut = () => {
  userSession.signUserOut();
  window.location.reload();
};
