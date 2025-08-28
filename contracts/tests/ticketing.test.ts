import { describe, it, beforeEach, expect } from 'vitest';
import { Cl } from '@stacks/transactions';

const accounts = simnet.getAccounts();
const deployer = accounts.get('deployer')!;
const wallet1 = accounts.get('wallet_1')!;
const wallet2 = accounts.get('wallet_2')!;

describe('Ticketing Contract - Core Tests', () => {
  beforeEach(() => {
    simnet.setEpoch('3.0');
  });

  describe('Event Creation', () => {
    it('should create an event successfully', () => {
      const createEventResult = simnet.callPublicFn(
        'ticketing',
        'create-event',
        [
          Cl.stringAscii('Blockchain Conference'),
          Cl.uint(1000000), // 10 STX in microstx
          Cl.uint(100),     // 100 tickets
          Cl.uint(50)       // 50% max resale markup
        ],
        deployer
      );

      expect(createEventResult.result).toBeOk(Cl.uint(1));
    });

    it('should fail to create event with invalid price', () => {
      const createEventResult = simnet.callPublicFn(
        'ticketing',
        'create-event',
        [
          Cl.stringAscii('Free Event'),
          Cl.uint(0), // Invalid price
          Cl.uint(50),
          Cl.uint(20)
        ],
        deployer
      );

      expect(createEventResult.result).toBeErr(Cl.uint(201)); // ERR_INVALID_PRICE
    });

    it('should increment event counter correctly', () => {
      // Create first event
      simnet.callPublicFn(
        'ticketing',
        'create-event',
        [
          Cl.stringAscii('Event 1'),
          Cl.uint(1000000),
          Cl.uint(50),
          Cl.uint(20)
        ],
        deployer
      );

      // Create second event
      const createSecondEventResult = simnet.callPublicFn(
        'ticketing',
        'create-event',
        [
          Cl.stringAscii('Event 2'),
          Cl.uint(2000000),
          Cl.uint(30),
          Cl.uint(30)
        ],
        deployer
      );

      expect(createSecondEventResult.result).toBeOk(Cl.uint(2));
    });
  });

  describe('Ticket Purchase', () => {
    beforeEach(() => {
      // Create a test event before each test
      simnet.callPublicFn(
        'ticketing',
        'create-event',
        [
          Cl.stringAscii('Test Event'),
          Cl.uint(1000000), // 10 STX
          Cl.uint(5),       // 5 tickets
          Cl.uint(25)       // 25% max resale
        ],
        deployer
      );
    });

    it('should allow ticket purchase', () => {
      const buyResult = simnet.callPublicFn(
        'ticketing',
        'buy-ticket',
        [Cl.uint(1)],
        wallet1
      );

      expect(buyResult.result).toBeOk(Cl.uint(1));

      // Verify ticket ownership
      const ownerResult = simnet.callReadOnlyFn(
        'ticketing',
        'get-ticket-owner',
        [Cl.uint(1), Cl.uint(1)],
        deployer
      );

      expect(ownerResult.result).toBeSome(Cl.principal(wallet1));
    });

    it('should fail when event is sold out', () => {
      // Buy all 5 tickets
      for (let i = 0; i < 5; i++) {
        simnet.callPublicFn(
          'ticketing',
          'buy-ticket',
          [Cl.uint(1)],
          wallet1
        );
      }

      // Try to buy 6th ticket
      const buyResult = simnet.callPublicFn(
        'ticketing',
        'buy-ticket',
        [Cl.uint(1)],
        wallet2
      );

      expect(buyResult.result).toBeErr(Cl.uint(100)); // ERR_SOLD_OUT
    });

    it('should fail for non-existent event', () => {
      const buyResult = simnet.callPublicFn(
        'ticketing',
        'buy-ticket',
        [Cl.uint(999)], // Non-existent event
        wallet1
      );

      expect(buyResult.result).toBeErr(Cl.uint(102)); // ERR_EVENT_NOT_FOUND
    });

    it('should assign sequential ticket IDs', () => {
      // Buy first ticket
      const buy1Result = simnet.callPublicFn(
        'ticketing',
        'buy-ticket',
        [Cl.uint(1)],
        wallet1
      );

      // Buy second ticket
      const buy2Result = simnet.callPublicFn(
        'ticketing',
        'buy-ticket',
        [Cl.uint(1)],
        wallet2
      );

      expect(buy1Result.result).toBeOk(Cl.uint(1));
      expect(buy2Result.result).toBeOk(Cl.uint(2));
    });
  });

  describe('Ticket Resale Validation', () => {
    beforeEach(() => {
      // Create event and buy a ticket with organizer (free)
      simnet.callPublicFn(
        'ticketing',
        'create-event',
        [
          Cl.stringAscii('Resale Event'),
          Cl.uint(1000000),
          Cl.uint(10),
          Cl.uint(50)
        ],
        deployer
      );

      simnet.callPublicFn(
        'ticketing',
        'buy-ticket',
        [Cl.uint(1)],
        deployer // Organizer buys for free
      );
    });

    it('should fail when resale price exceeds maximum', () => {
      const excessivePrice = 1600000; // 60% markup (exceeds 50% limit)

      const resaleResult = simnet.callPublicFn(
        'ticketing',
        'resell-ticket',
        [
          Cl.uint(1),
          Cl.uint(1),
          Cl.uint(excessivePrice),
          Cl.principal(wallet2)
        ],
        deployer
      );

      expect(resaleResult.result).toBeErr(Cl.uint(205)); // ERR_EXCEED_MAX_RESALE
    });

    it('should fail when non-owner tries to resell', () => {
      const resaleResult = simnet.callPublicFn(
        'ticketing',
        'resell-ticket',
        [
          Cl.uint(1),
          Cl.uint(1),
          Cl.uint(1200000),
          Cl.principal(wallet2)
        ],
        wallet1 // wallet1 doesn't own the ticket
      );

      expect(resaleResult.result).toBeErr(Cl.uint(204)); // ERR_NOT_TICKET_OWNER
    });

    it('should fail when trying to sell to yourself', () => {
      const resaleResult = simnet.callPublicFn(
        'ticketing',
        'resell-ticket',
        [
          Cl.uint(1),
          Cl.uint(1),
          Cl.uint(1200000),
          Cl.principal(deployer) // Trying to sell to self
        ],
        deployer
      );

      expect(resaleResult.result).toBeErr(Cl.uint(206)); // ERR_INVALID_BUYER
    });
  });

  describe('Read-Only Functions', () => {
    beforeEach(() => {
      simnet.callPublicFn(
        'ticketing',
        'create-event',
        [
          Cl.stringAscii('Read Test Event'),
          Cl.uint(2000000),
          Cl.uint(3),
          Cl.uint(30)
        ],
        deployer
      );

      simnet.callPublicFn(
        'ticketing',
        'buy-ticket',
        [Cl.uint(1)],
        wallet1
      );
    });

    it('should return correct ticket owner', () => {
      const ownerResult = simnet.callReadOnlyFn(
        'ticketing',
        'get-ticket-owner',
        [Cl.uint(1), Cl.uint(1)],
        deployer
      );

      expect(ownerResult.result).toBeSome(Cl.principal(wallet1));
    });

    it('should return correct event details', () => {
      const eventResult = simnet.callReadOnlyFn(
        'ticketing',
        'get-event',
        [Cl.uint(1)],
        deployer
      );

      expect(eventResult.result).toBeSome(
        Cl.tuple({
          name: Cl.stringAscii('Read Test Event'),
          price: Cl.uint(2000000),
          'total-tickets': Cl.uint(3),
          'tickets-sold': Cl.uint(1),
          organizer: Cl.principal(deployer),
          'max-resale-percentage': Cl.uint(30)
        })
      );
    });

    it('should return correct ticket resale price', () => {
      const priceResult = simnet.callReadOnlyFn(
        'ticketing',
        'get-ticket-resale-price',
        [Cl.uint(1), Cl.uint(1)],
        deployer
      );

      expect(priceResult.result).toBeSome(Cl.uint(2000000));
    });

    it('should return none for non-existent items', () => {
      const ownerResult = simnet.callReadOnlyFn(
        'ticketing',
        'get-ticket-owner',
        [Cl.uint(1), Cl.uint(999)],
        deployer
      );

      const eventResult = simnet.callReadOnlyFn(
        'ticketing',
        'get-event',
        [Cl.uint(999)],
        deployer
      );

      expect(ownerResult.result).toBeNone();
      expect(eventResult.result).toBeNone();
    });
  });
});