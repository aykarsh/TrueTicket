## Project Description

TrueTicket is a decentralized event ticketing system powered by the Stacks blockchain using Clarity smart contracts. It solves real-world ticketing problems, such as fraud, counterfeiting, and high service fees, by leveraging NFT-based tickets, transparency, and direct peer-to-peer payments.

## Key Components


<p align="center">
  <img src="../docs/assests/Home page .png" alt="Home Page" width="45%"/>
  <img src="../docs/assests/About us .png" alt="About Us" width="45%"/>
</p>

<p align="center">
  <img src="../docs/assests/Features .png" alt="Features" width="45%"/>
  <img src="../docs/assests/Connecting to wallet .png" alt="Connecting to Wallet" width="45%"/>
</p>

<p align="center">
  <img src="../docs/assests/Customer dashboard .png" alt="Customer Dashboard" width="45%"/>
  <img src="../docs/assests/Organiser Dashboard .png" alt="Organiser Dashboard" width="45%"/>
</p>

<video src="../docs/assests/WhatsApp Video 2025-08-29 at 13.29.32" width="600" controls>

## Key Features

**Key Features of This Code**

1.  Integration with Stacks Blockchain
    
    *   Uses @stacks/transactions library to interact with Clarity smart contracts on the Stacks blockchain.
2.  Read & Write Operations
    
    *   Supports read-only contract calls (callReadOnlyFunction) for fetching data like event details, ticket ownership, etc.
        
    *   Supports contract call transactions (openContractCall) for writing to the blockchain (e.g., buying a ticket).
        
3.  Buy Ticket Functionality
    
    *   Implements buyTicket(eventId) function to call the buy-ticket public function from your Clarity smart contract.
4.  Secure Transaction Handling
    
    *   Uses senderKey and network configuration to securely sign and send blockchain transactions.
5.  Dynamic Event Handling
    
    *   Accepts eventId as an argument, making it reusable for multiple events without hardcoding.

## Tech Stack

**Frontend**: React, Tailwind CSS, Lucide React, Framework Motion, Stacks.js 

**Backend**: Clarity, Clarinet, Express.js, Stacks Blockchain Othe
