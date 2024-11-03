export const CARD_ADDED = 'cardAdded'
export const cardAdded = card => ({ type: CARD_ADDED, payload: card })

export const CARD_REMOVED = 'cardRemoved'
export const cardRemoved = card => ({ type: CARD_REMOVED, payload: card })