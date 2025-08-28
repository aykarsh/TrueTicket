
// @ts-ignore
import { Tx } from "vitest-environment-clarinet";
import { describe, it, expect } from "vitest";

describe("Ticketing contract full workflow", () => {
  it("should allow event creation, ticket purchase, resale, and ownership transfer", async () => {
      // Mock or import chain and accounts as needed for your test environment
      // Extend globalThis type for chain and accounts
      interface GlobalTestContext {
        chain: any;
        accounts: Map<string, { address: string }>;
      }
      const chain = (globalThis as unknown as GlobalTestContext).chain; // Replace with actual chain mock/import
      const accounts = (globalThis as unknown as GlobalTestContext).accounts; // Replace with actual accounts mock/import
  
      const deployer = accounts.get("deployer")!;
      const buyerA = accounts.get("wallet_1")!;
      const buyerB = accounts.get("wallet_2")!;

    // ---------------------------
    // 1. Create Event
    // ---------------------------
    let block = chain.mineBlock([
      Tx.contractCall(
        "ticketing",
        "create-event",
        [
          `"Hackathon Event"`,
          "u5000",
          "u5",
          "u20" // max resale % allowed
        ],
        deployer.address
      )
    ]);

    const eventId = block.receipts[0].result.expectOk().expectUint();
    expect(typeof eventId).toBe("bigint"); // Vitest assertion

    // ---------------------------
    // 2. Buyer A buys a ticket
    // ---------------------------
    block = chain.mineBlock([
      Tx.contractCall("ticketing", "buy-ticket", [`u${eventId}`], buyerA.address)
    ]);
    const ticketId = block.receipts[0].result.expectOk().expectUint();
    expect(typeof ticketId).toBe("bigint");

    // ---------------------------
    // 3. Check ticket owner
    // ---------------------------
    block = chain.mineBlock([
      Tx.contractCall(
        "ticketing",
        "get-ticket-owner",
        [`u${eventId}`, `u${ticketId}`],
        deployer.address
      )
    ]);
    block.receipts[0].result.expectSome().expectPrincipal(buyerA.address);

    // ---------------------------
    // 4. Buyer A resells ticket to Buyer B
    // ---------------------------
    block = chain.mineBlock([
      Tx.contractCall(
        "ticketing",
        "resell-ticket",
        [`u${eventId}`, `u${ticketId}`, "u6000", `"${buyerB.address}"`],
        buyerA.address
      )
    ]);
    block.receipts[0].result.expectOk().expectUint();

    // ---------------------------
    // 5. Confirm new owner
    // ---------------------------
    block = chain.mineBlock([
      Tx.contractCall(
        "ticketing",
        "get-ticket-owner",
        [`u${eventId}`, `u${ticketId}`],
        deployer.address
      )
    ]);
    block.receipts[0].result.expectSome().expectPrincipal(buyerB.address);

    // ---------------------------
    // 6. Fetch event details
    // ---------------------------
    block = chain.mineBlock([
  Tx.contractCall("ticketing", "get-event", [`u${eventId}`], deployer.address)
    ]);
    expect(block.receipts[0].result.isSome()).toBe(true);
  });
});

