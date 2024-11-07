import m from "mithril";
import Search from "./features/search/components/search.js";
import Deck from "./features/deck/components/deck.js";
import Stats from "./features/deck/components/stats.js";

import * as searchSelectors from "./features/search/state/searchSelectors.js"
import * as deckSelectors from "./features/deck/state/deckSelectors.js"
import { store } from "./store.js"
import WiseComponent from "./wiseComponent.js";

export default class App extends WiseComponent{
    view() {
        const showbasics = searchSelectors.selectUiShowBasics(store.getState());
        const deck = deckSelectors.selectDeck(store.getState());
        return (
            <>
                <header>
                    MTG Deck Builder
                </header>
                <main class='main'>
                    <Search showBasics={showbasics}>
                    </Search>
                    <Deck deck={deck}>
                    </Deck>
                </main>
                <Stats></Stats>
            </>
        )
    }
}
