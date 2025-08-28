const {
  makeContractCall,
  BufferCV,
  uintCV,
  standardPrincipalCV,
  NonFungibleConditionCode,
  createAssetInfo,
  makeStandardNonFungiblePostCondition,
  broadcastTransaction,
} = require('@stacks/transactions');
const { StacksTestnet } = require('@stacks/network');

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_NAME = 'ticketing';
const NETWORK = new StacksTestnet();

const createTicketPostCondition = (sender, ticketId, eventId) => {
  const assetAddress = CONTRACT_ADDRESS;
  const assetContractName = CONTRACT_NAME;
  const assetName = 'ticket';
  const nonFungibleAssetInfo = createAssetInfo(
    assetAddress,
    assetContractName,
    assetName
  );

  return makeStandardNonFungiblePostCondition(
    sender,
    NonFungibleConditionCode.Owns,
    nonFungibleAssetInfo,
    uintCV(ticketId)
  );
};

const buyTicket = async (sender, eventId) => {
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'buy-ticket',
    functionArgs: [uintCV(eventId)],
    senderKey: sender.privateKey,
    validateWithAbi: true,
    network: NETWORK,
    anchorMode: 1,
  };

  const transaction = await makeContractCall(txOptions);
  const broadcastResponse = await broadcastTransaction(transaction, NETWORK);
  return broadcastResponse;
};

const resellTicket = async (sender, eventId, ticketId, newPrice, newBuyer) => {
  const postCondition = createTicketPostCondition(sender.address, ticketId, eventId);

  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'resell-ticket',
    functionArgs: [
      uintCV(eventId),
      uintCV(ticketId),
      uintCV(newPrice),
      standardPrincipalCV(newBuyer)
    ],
    senderKey: sender.privateKey,
    validateWithAbi: true,
    network: NETWORK,
    anchorMode: 1,
    postConditions: [postCondition]
  };

  const transaction = await makeContractCall(txOptions);
  const broadcastResponse = await broadcastTransaction(transaction, NETWORK);
  return broadcastResponse;
};

module.exports = {
  buyTicket,
  resellTicket,
  createTicketPostCondition
};
