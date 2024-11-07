import m from "mithril";

import requestState from "../state/requestState";
import WiseComponent from "../../../wiseComponent";

export default class SearchList extends WiseComponent {
    view(vnode) {
        const attrs = vnode.attrs;

        const cards = attrs.cards;
        const onadd = attrs.onadd;
        const requeststate = attrs.requeststate;

        switch (requeststate) {
            case requestState.finished:
                return (<div id="cardList">
                    <ul>
                        {cards.map(
                            (card, i) => (
                                <li>
                                    <button onclick={() => onadd(card)}>{card.name}</button>
                                </li>)
                        )}
                    </ul>
                </div>)
            case requestState.inProgress:
                return (<h2>Load in progress...</h2>)
            case requestState.failed:
                return (<h2>Load failed</h2>)
        }
    }
}