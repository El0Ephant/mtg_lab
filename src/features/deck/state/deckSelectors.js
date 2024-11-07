import { createSelector } from 'reselect'

export const selectDeck = createSelector([state => state.deck.nonLands,
state => state.deck.lands,
state => state.deck.nonLandsAmounts,
state => state.deck.landsAmounts
], (nonLands, lands, nonLandsAmounts, landsAmounts) => {
    //console.log("Reselect deck")
    return {
        cards: [...nonLands.values(), ...lands.values()],
        amounts: [...nonLandsAmounts.values(), ...landsAmounts.values()]
    }
}
)

const colorToIndex = {
    W: 0,
    U: 1,
    B: 2,
    R: 3,
    G: 4,
    C: 5
};

const emptyColorData = [
    { color: 'W', count: 0 },
    { color: 'U', count: 0 },
    { color: 'B', count: 0 },
    { color: 'R', count: 0 },
    { color: 'G', count: 0 },
    { color: 'C', count: 0 }
]

export const selectColorData = createSelector(
    [state => state.deck.nonLands,
    state => state.deck.nonLandsAmounts],
    (cards, amounts) => {
        //console.log("Reselect color")
        const result = structuredClone(emptyColorData);

        for (const keyValue of cards) {
            const id = keyValue[0];
            const card = keyValue[1];


            if (card.color_identity.empty) {
                result['C'].count += amounts.get(id);
                break;
            }
            for (const color of card.color_identity) {
                result[colorToIndex[color]].count += amounts.get(id);
            }
        }
        return result;
    })


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

export const selectCostData = createSelector(
    [
        state => state.deck.nonLands,
        state => state.deck.nonLandsAmounts
    ], (cards, amounts) => {
        //console.log("Reselect cost")
        const result = structuredClone(emptyCostData);

        for (const keyValue of cards) {
            const card = keyValue[1]
            const id = keyValue[0];

            if (card.cmc >= 7) {
                result[7].count += amounts.get(id);
            }
            else result[card.cmc].count += amounts.get(id);
        }
        return result;
    })


export const selectDeckConsistency = createSelector([
    state => state.deck.nonLands,
    state => state.deck.nonLandsAmounts,
    state => state.deck.lands,
    state => state.deck.landsAmounts,
    state => state.deck.format
], (nonLands,
    nonLandsAmounts,
    lands,
    landsAmounts,
    format) => {
    console.log('Reselect errors')

    const errors = [];

    let alreadyIllegal = false;
    for (const card of nonLands.values()) {
        if (card.legalities[format] === 'not_legal') {
            errors.push('Contains illegal cards')
            alreadyIllegal  = true
            break;
        }
    }
    if (!alreadyIllegal) {
        for (const card of lands.values()) {
            if (card.legalities[format] === 'not_legal') {
                errors.push('Contains illegal cards')
                break;
            }
        }
    }

    let amount = 0
    for (const val of nonLandsAmounts.values()) {
        amount += val
    }
    for (const val of landsAmounts.values()) {
        amount += val
    }

    if (amount < 60) {
        errors.push('Contains less then 60 cards')
    }

    return errors;
})