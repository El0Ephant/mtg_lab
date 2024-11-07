import m from "mithril";

import * as searchSelectors from "../state/searchSelectors.js"
import * as deckActions from "../../deck/state/deckActions.js"
import { store } from "../../../store.js"

import SearchList from "./searchList.js";
import WiseComponent from "../../../wiseComponent.js";

export default class SearchBasic extends WiseComponent {
    view(vnode) {
        const onswitch = vnode.attrs.onswitch;
        const cards = vnode.attrs.cards;
        return (
            <>
                <button onclick={onswitch}>Switch to non-basics</button>
                <SearchList
                    cards={cards}
                    onadd={(card) => { store.dispatch(deckActions.cardAdded(card)) }}
                    requeststate={searchSelectors.selectBasicsRequestState(store.getState())}>
                </SearchList>
            </>
        )
    }
}
