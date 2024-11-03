import Immutable from "immutable"
// TODO: RESELECT
export const selectDeck = state => {
    return {
        cards: [...state.deck.nonLands.values(), ...state.deck.lands.values()],
        amounts: [...state.deck.nonLandsAmounts.values(), ...state.deck.landsAmounts.values()]
    }
}

const emptyColorData = [
    { color: 'W', count: 0 },
    { color: 'U', count: 0 },
    { color: 'B', count: 0 },
    { color: 'R', count: 0 },
    { color: 'G', count: 0 },
    { color: 'C', count: 0 }
]
const colorToIndex = {
    W: 0,
    U: 1,
    B: 2,
    R: 3,
    G: 4,
    C: 5
};

// TODO: RESELECT
export const selectColorData = (state) => {
    const cards = state.deck.nonLands;
    const result = structuredClone(emptyColorData);
    
    for (const keyValue of cards) {
        const id = keyValue[0];
        const card = keyValue[1];

        
        if (card.color_identity.empty) {
            result['C'].count += state.deck.nonLandsAmounts.get(id);
            break;
        }
        for (const color of card.color_identity) {
            console.log(state.deck.nonLandsAmounts.get(id));
            result[colorToIndex[color]].count += state.deck.nonLandsAmounts.get(id);
            console.log(result[colorToIndex[color]].count);
        }
    }
    return result;
}


const emptyCostData = [
    { cost: 0, count: 0 },
    { cost: 1, count: 0 },
    { cost: 2, count: 0 },
    { cost: 3, count: 0 },
    { cost: 4, count: 0 },
    { cost: 5, count: 0 },
    { cost: 6, count: 0 },
    { cost: '7+', count: 0 }
]

// TODO: RESELECT
export const selectCostData = (state) => {
    const cards = state.deck.nonLands;
    const result = structuredClone(emptyCostData);
    
    for (const keyValue of cards) {
        const card = keyValue[1]
        const id = keyValue[0];

        if (card.cmc >= 7) {
            result[7].count += state.deck.nonLandsAmounts.get(id);
        }
        else result[card.cmc].count += state.deck.nonLandsAmounts.get(id);
    }
    return result;
}