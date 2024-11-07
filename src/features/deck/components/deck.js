import m from "mithril";

import * as deckActions from '../state/deckActions';
import * as deckSelectors from '../state/deckSelectors.js';

import store from '../../../store';
import Card from './card.js';
import WiseComponent from "../../../wiseComponent.js";
import Errors from "./errors.js";

export default class Deck extends WiseComponent {
    view(vnode) {
        const deck = vnode.attrs.deck;

        const cardObjects = deck.cards;
        const cardAmounts = deck.amounts;

        return (
            <div class="column">
                <div>
                    <label for="deckFormatList">Deck format:</label>
                    <br />
                    <select id="deckFormatList"
                        onchange={function () {
                            store.dispatch(deckActions.deckFormatChanged(this.value))
                        }}>
                        <option>standard</option>
                        <option>pioneer</option>
                        <option>modern</option>
                        <option>legacy</option>
                        <option>vintage</option>
                        <option>pauper</option>
                    </select>
                </div>

                <Errors errors = {deckSelectors.selectDeckConsistency(store.getState())}></Errors>

                <div id="grid">
                    {Array(cardObjects.length).fill(0).map((_, i) => {
                        const card = cardObjects[i]
                        const amount = cardAmounts[i]
                        return <div>
                            <Card card={card}
                                amount={amount}
                                onadd={(card) => { store.dispatch(deckActions.cardAdded(card)) }}
                                ondelete={(card) => { store.dispatch(deckActions.cardRemoved(card)) }}>
                            </Card>
                        </div>
                    })
                    }
                </div>
            </div>
        )
    }
}