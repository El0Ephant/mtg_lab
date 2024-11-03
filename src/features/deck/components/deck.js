import m from "mithril";

import * as deckActions from '../state/deckActions';
import store from "../../../store";

export default class Deck {
    view(vnode) {
        const deck = vnode.attrs.deck;

        const cardObjects = deck.cards;
        const cardAmounts = deck.amounts;

        return (
            <div class="content">
                <div id="grid">

                    {Array(cardObjects.length).fill(0).map((_, i) => {
                        const card = cardObjects[i]
                        const amount = cardAmounts[i]
                        return <div>
                            <Card card={card}
                                amount={amount}
                                onadd={(card) => { store.dispatch(deckActions.cardAdded(card)) }}
                                ondelete={(card) => {store.dispatch(deckActions.cardRemoved(card)) }}
                            ></Card>
                        </div>
                    })


                    }

                </div>
            </div>
        )
    }
}

class Card {
    view(vnode) {
        const attrs = vnode.attrs;

        const card = attrs.card;
        const amount = attrs.amount;

        const onadd = attrs.onadd;
        const ondelete = attrs.ondelete;

        const image = card.image_uris !== undefined ? card.image_uris.normal : ''; //TODO: handle undefined
        return (
            <>
                <img src={image} style='height: 250px;'></img>
                <div>
                    <button onclick={() => ondelete(card)}>-</button>
                    {amount}
                    <button onclick={() => onadd(card)}>+</button>
                </div>
            </>
        )
    }
}