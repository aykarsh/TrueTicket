;; ============================
;; NFT Ticketing Contract
;; ============================

;; ----------------------------
;; NFT and Maps
;; ----------------------------
(define-non-fungible-token ticket uint)
(define-map ticket-owners {event-id: uint, ticket-id: uint} principal)
(define-map ticket-resale-prices {event-id: uint, ticket-id: uint} uint)
(define-map events
  uint
  {
    name: (string-ascii 50),
    price: uint,
    total-tickets: uint,
    tickets-sold: uint,
    organizer: principal,
    max-resale-percentage: uint
  }
)

(define-data-var event-counter uint u0)

;; ----------------------------
;; Error Codes
;; ----------------------------
(define-constant ERR_SOLD_OUT u100)
(define-constant ERR_PAYMENT_FAILED u101)
(define-constant ERR_EVENT_NOT_FOUND u102)
(define-constant ERR_INVALID_PRICE u201)
(define-constant ERR_INVALID_TICKET_TOTAL u202)
(define-constant ERR_INVALID_NAME u203)
(define-constant ERR_NOT_TICKET_OWNER u204)
(define-constant ERR_EXCEED_MAX_RESALE u205)
(define-constant ERR_INVALID_BUYER u206)
(define-constant ERR_NFT_TRANSFER_FAILED u207)
(define-constant ERR_NFT_MINT_FAILED u208)

;; ----------------------------
;; Private helper for transfers
;; ----------------------------
(define-private (do-ticket-transfer (event-id uint) (ticket-id uint) (owner principal) (new-buyer principal) (new-price uint))
  (begin
    (unwrap! (nft-transfer? ticket ticket-id owner new-buyer) (err ERR_NFT_TRANSFER_FAILED))
    (map-set ticket-owners {event-id: event-id, ticket-id: ticket-id} new-buyer)
    (map-set ticket-resale-prices {event-id: event-id, ticket-id: ticket-id} new-price)
    (ok ticket-id)
  )
)

;; ===================================================
;; ORGAZNIZER FUNCTIONS
;; ===================================================

(define-public (create-event (name (string-ascii 50)) (price uint) (total-tickets uint) (max-resale-percentage uint))
  (begin
    (asserts! (> price u0) (err ERR_INVALID_PRICE))
    (asserts! (> total-tickets u0) (err ERR_INVALID_TICKET_TOTAL))
    (asserts! (> (len name) u0) (err ERR_INVALID_NAME))
    (asserts! (and (>= max-resale-percentage u0) (<= max-resale-percentage u100)) (err ERR_INVALID_PRICE))

    (var-set event-counter (+ (var-get event-counter) u1))
    (map-set events (var-get event-counter)
      {
        name: name,
        price: price,
        total-tickets: total-tickets,
        tickets-sold: u0,
        organizer: tx-sender,
        max-resale-percentage: max-resale-percentage
      }
    )
    (ok (var-get event-counter))
  )
)

;; ===================================================
;; USER FUNCTIONS
;; ===================================================

(define-public (buy-ticket (event-id uint))
  (let (
        (event (unwrap! (map-get? events event-id) (err ERR_EVENT_NOT_FOUND)))
        (buyer tx-sender)
      )
    (begin
      (asserts! (< (get tickets-sold event) (get total-tickets event)) (err ERR_SOLD_OUT))

      ;; Transfer STX if buyer != organizer
      (if (not (is-eq buyer (get organizer event)))
          (unwrap! (stx-transfer? (get price event) buyer (get organizer event)) (err ERR_PAYMENT_FAILED))
          true
      )

      ;; Mint ticket
      (let ((ticket-id (+ (get tickets-sold event) u1)))
        (unwrap! (nft-mint? ticket ticket-id buyer) (err ERR_NFT_MINT_FAILED))

        (map-set events event-id
          (merge event {tickets-sold: ticket-id})
        )

        (map-set ticket-owners {event-id: event-id, ticket-id: ticket-id} buyer)
        (map-set ticket-resale-prices {event-id: event-id, ticket-id: ticket-id} (get price event))

        (ok ticket-id)
      )
    )
  )
)

(define-public (resell-ticket (event-id uint) (ticket-id uint) (new-price uint) (new-buyer principal))
  (let (
    (owner (unwrap! (map-get? ticket-owners {event-id: event-id, ticket-id: ticket-id}) (err ERR_EVENT_NOT_FOUND)))
    (event (unwrap! (map-get? events event-id) (err ERR_EVENT_NOT_FOUND)))
    (original-price (unwrap! (map-get? ticket-resale-prices {event-id: event-id, ticket-id: ticket-id}) (err ERR_EVENT_NOT_FOUND)))
  )
    (begin
      (asserts! (> new-price u0) (err ERR_INVALID_PRICE))
      (asserts! (is-eq tx-sender owner) (err ERR_NOT_TICKET_OWNER))
      (asserts! (not (is-eq new-buyer owner)) (err ERR_INVALID_BUYER))
      (asserts! (<= new-price (+ original-price (/ (* original-price (get max-resale-percentage event)) u100))) (err ERR_EXCEED_MAX_RESALE))
      (unwrap! (stx-transfer? new-price new-buyer owner) (err ERR_PAYMENT_FAILED))
      (do-ticket-transfer event-id ticket-id owner new-buyer new-price)
    )
  )
)

;; ===================================================
;; SHARED READ-ONLY FUNCTIONS
;; ===================================================

(define-read-only (get-ticket-owner (event-id uint) (ticket-id uint))
  (map-get? ticket-owners {event-id: event-id, ticket-id: ticket-id})
)

(define-read-only (get-event (event-id uint))
  (map-get? events event-id)
)
(define-read-only (get-ticket-resale-price (event-id uint) (ticket-id uint))
  (map-get? ticket-resale-prices {event-id: event-id, ticket-id: ticket-id})
)