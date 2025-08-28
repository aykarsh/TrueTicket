;; === Script to test the ticketing contract ===

;; Step 1: Create event by deployer
(contract-call? .ticketing create-event u1 "Hackathon Event" u100 u2)

;; Step 2: Switch to wallet_1 and buy ticket
::set tx-sender wallet_1
(contract-call? .ticketing buy-ticket u1)
(contract-call? .ticketing get-user-tickets wallet_1)

;; Step 3: Switch to wallet_2 and buy ticket
::set tx-sender wallet_2
(contract-call? .ticketing buy-ticket u1)
(contract-call? .ticketing get-user-tickets wallet_2)

;; Step 4: Back to deployer, check event info
::set tx-sender wallet_1
(contract-call? .ticketing get-event u1)
