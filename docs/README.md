## Project Description

TrueTicket is a decentralized event ticketing system powered by the Stacks blockchain using Clarity smart contracts. It solves real-world ticketing problems, such as fraud, counterfeiting, and high service fees, by leveraging NFT-based tickets, transparency, and direct peer-to-peer payments.

## Key Components

<a href="url"></a>\`\`import { callReadOnlyFunction, openContractCall } from '@stacks/transactions';

// Example: Buy Ticket function const buyTicket = async (eventId) => {
<img src="" alt=""> const txOptions = { contractAddress, contractName, functionName: 'buy-ticket', functionArgs: \[uintCV(eventId)\], network, senderKey, }; await openContractCall(txOptions); };\`\`

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
