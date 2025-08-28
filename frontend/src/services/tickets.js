import { userSession } from '../utils/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const buyTicket = async (eventId) => {
  try {
    const userData = userSession.loadUserData();
    const response = await fetch(`${API_URL}/tickets/buy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId,
        sender: {
          address: userData.profile.stxAddress,
          privateKey: userData.profile.stxPrivateKey,
        },
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to buy ticket');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error buying ticket:', error);
    throw error;
  }
};

export const resellTicket = async (eventId, ticketId, newPrice, newBuyer) => {
  try {
    const userData = userSession.loadUserData();
    const response = await fetch(`${API_URL}/tickets/resell`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId,
        ticketId,
        newPrice,
        newBuyer,
        sender: {
          address: userData.profile.stxAddress,
          privateKey: userData.profile.stxPrivateKey,
        },
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to resell ticket');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error reselling ticket:', error);
    throw error;
  }
};
