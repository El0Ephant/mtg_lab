import m from "mithril";

import * as searchSelectors from "../state/searchSelectors.js"
import * as deckActions from "../../deck/state/deckActions.js"
import * as searchActions from "../state/searchActions.js"
import { store } from "../../../store.js"

import SearchForm from "./searchForm.js";
import SearchList from "./searchList.js";
import WiseComponent from "../../../wiseComponent.js";

export default class SearchNonBasic extends WiseComponent {
    view(vnode) {
        const onswitch = vnode.attrs.onswitch;
        const cards = vnode.attrs.cards;
        return (
            <>
                <button onclick={onswitch}>Switch to basics</button>
                <SearchForm
                    search={searchSelectors.selectUiSearch(store.getState())}
                    format={searchSelectors.selectUiFormat(store.getState())}
                    onsearchchange={(search) => {
                        store.dispatch(searchActions.searchTextChanged(search))
                        store.dispatch(searchActions.searchRequested())
                    }}
                    onformatchange={(format) => {
                        store.dispatch(searchActions.searchFormatChanged(format))
                        store.dispatch(searchActions.searchRequested())
                    }}>
                </SearchForm>
                <SearchList
                    cards={cards}
                    onadd={(card) => { store.dispatch(deckActions.cardAdded(card)) }}
                    requeststate={searchSelectors.selectNonBasicsRequestState(store.getState())}>
                </SearchList>
            </>
        )
    }
}