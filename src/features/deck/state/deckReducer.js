import Immutable from "immutable";

import * as deckActions from "./deckActions";

import { produce, enableMapSet } from "immer"


const initialState = {
    lands: Immutable.Map(),
    landsAmounts: Immutable.Map(),
    nonLands: Immutable.Map(),
    nonLandsAmounts: Immutable.Map(),
}

function _addCard(card, objects, amounts, isLand) {
    const amount = amounts.get(card.id);
    if (amount === undefined) {
        return { newObjects: objects.set(card.id, card), newAmounts: amounts.set(card.id, 1) };
    }

    if (amount < 4 || isLand && card.type_line.includes('Basic')) {
        return { newObjects: objects, newAmounts: amounts.set(card.id, amount + 1) };
    }

    return { newObjects: objects, newAmounts: amounts };
}


function _removeCard(card, objects, amounts) {
    const amount = amounts.get(card.id);
    if (amount === undefined) {
        return { newObjects: objects, newAmounts: amounts };
    }

    if (amount === 1) {
        return { newObjects: objects.delete(card.id), newAmounts: amounts.delete(card.id) };
    }


    return { newObjects: objects, newAmounts: amounts.set(card.id, amount - 1) }
}

const _isLand = (card) => card.type_line.includes("Land")

export default function deckReducer(state = initialState, action) {

    switch (action.type) {
        case deckActions.CARD_ADDED: {
            const card = action.payload
            if (_isLand(card)) {
                const { newObjects, newAmounts } = _addCard(card, state.lands, state.landsAmounts, true);
                return {
                    ...state,
                    lands: newObjects,
                    landsAmounts: newAmounts,
                };
            } else {
                const { newObjects, newAmounts } = _addCard(card, state.nonLands, state.nonLandsAmounts, false);
                return {
                    ...state,
                    nonLands: newObjects,
                    nonLandsAmounts: newAmounts,
                };
            }
        }

        case deckActions.CARD_REMOVED: {
            const card = action.payload;

            if (_isLand(card)) {
                const { newObjects, newAmounts } = _removeCard(card, state.lands, state.landsAmounts);
                return {
                    ...state,
                    lands: newObjects,
                    landsAmounts: newAmounts,
                };
            } else {
                const { newObjects, newAmounts } = _removeCard(card, state.nonLands, state.nonLandsAmounts);
                return {
                    ...state,
                    nonLands: newObjects,
                    nonLandsAmounts: newAmounts,
                };
            }
        }

        default:
            return state;
    }
}