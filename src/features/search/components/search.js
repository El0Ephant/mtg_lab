import m from "mithril";
import MtgMock from "~/src/api/mtgMock.js";
import SearchForm from "./searchForm.js";
import SearchList from "./searchList.js";

import * as searchSelectors from "../state/searchSelectors.js"
import * as searchActions from "../state/searchActions.js"
import * as deckActions from "../../deck/state/deckActions.js"
import { store } from "../../../store.js"

export default class Search {
    view(vnode) {
        console.log("SEARCH BUILD")
        const attrs = vnode.attrs;

        const showBasics = attrs.showBasics;
        const onswitch = () => {
            store.dispatch(searchActions.tabSwitched())
        }
        return (
            <div id="search">
                {showBasics ?
                    <SearchBasic onswitch={onswitch}
                        cards={searchSelectors.selectBasics(store.getState())}>
                    </SearchBasic> :
                    <SearchNonBasic onswitch={onswitch}
                        cards={searchSelectors.selectNonBasics(store.getState())}>
                    </SearchNonBasic>}
            </div>
        )
    }
}
class SearchBasic {
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

class SearchNonBasic {
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
                    requeststate={searchSelectors.selectBasicsRequestState(store.getState())}>
                </SearchList>
            </>
        )
    }
}