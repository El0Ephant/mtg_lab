class State {
    static _colorToIndex = {
        W: 0,
        U: 1,
        B: 2,
        R: 3,
        G: 4
    };

    constructor() {
        this.cardObjects = new Map();
        this.cardAmounts = new Map();
        this.colorData = [
            { color: 'White', count: 0 },
            { color: 'Blue', count: 0 },
            { color: 'Black', count: 0 },
            { color: 'Red', count: 0 },
            { color: 'Green', count: 0 },
            { color: 'Colorless', count: 0 }
        ];
        this.costData = [
            { cost: 0, count: 0 },
            { cost: 1, count: 0 },
            { cost: 2, count: 0 },
            { cost: 3, count: 0 },
            { cost: 4, count: 0 },
            { cost: 5, count: 0 },
            { cost: 6, count: 0 },
            { cost: '7+', count: 0}
        ];
    }

    addCard(card) {
        if (this.cardObjects.get(card.id) === undefined) {
            this.cardObjects.set(card.id, card);
            this.cardAmounts.set(card.id, 1);

            if (card.type_line.includes('Basic')) {
                return {deckUpdate: true, statUpdate: false};
            }

            this._changeCosts(card.cmc, 1);
            this._changeColors(card.color_identity, 1);
            return {deckUpdate: true, statUpdate: true};
        }

        const amount = this.cardAmounts.get(card.id) + 1;
        if (card.type_line.includes('Basic')) {
            this.cardAmounts.set(card.id, amount);
            return {deckUpdate: true, statUpdate: false};
        }

        if (amount <= 4) {
            this.cardAmounts.set(card.id, amount);
            this._changeCosts(card.cmc, 1);
            this._changeColors(card.color_identity, 1);
            return {deckUpdate: true, statUpdate: true};
        }

        return {deckUpdate: false, statUpdate: false};
    }

    removeCard(card) {
        if (this.cardObjects.get(card.id) === undefined) {
            return {deckUpdate: false, statUpdate: false};
        }

        const amount = this.cardAmounts.get(card.id) - 1;
        if (amount <= 0) {
            this.cardObjects.delete(card.id);
            this.cardAmounts.delete(card.id);
        }
        else this.cardAmounts.set(card.id, amount);

        if (card.type_line.includes('Basic'))
            return {deckUpdate: true, statUpdate: false};

        this._changeCosts(card.cmc, -1);
        this._changeColors(card.color_identity, -1);
        return {deckUpdate: true, statUpdate: true};
    }

    _changeCosts(cmc, amount) {
        cmc >= 7 ? this.costData[7].count += amount : this.costData[cmc].count += amount ;
    }

    _changeColors(color_identity, amount) {
        if (color_identity.length === 0) {
            this.colorData[5].count += amount;
            return;
        }

        for (const color of color_identity) {
            this.colorData[State._colorToIndex[color]].count += amount;
        }

    }

}

export {
    State
}