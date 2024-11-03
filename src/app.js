import m from "mithril";
import Search from "./features/search/components/search.js";
import Deck from "./features/deck/components/deck.js";
import Stats from "./features/deck/components/stats.js";

import * as searchSelectors from "./features/search/state/searchSelectors.js"
import * as deckSelectors from "./features/deck/state/deckSelectors.js"
import { store } from "./store.js"

export default class App {
    view(vnode) {

        const attrs = vnode.attrs;
        return (
            <>
                <header>
                    MTG Deck Builder
                </header>
                <main class='main'>
                    <Search showBasics={searchSelectors.selectUiShowBasics(store.getState())}>
                    </Search>
                    <Deck deck={deckSelectors.selectDeck(store.getState())}>
                    </Deck>
                </main>
                <Stats></Stats>
            </>
        )
    }
}
