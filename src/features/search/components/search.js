import m from "mithril";

import * as searchSelectors from "../state/searchSelectors.js"
import * as searchActions from "../state/searchActions.js"
import { store } from "../../../store.js"

import SearchBasic from "./searchBasic.js";
import SearchNonBasic from "./searchNonBasic.js";
import WiseComponent from "../../../wiseComponent.js";

export default class Search extends WiseComponent {
    view(vnode) {
        const attrs = vnode.attrs;

        const showBasics = attrs.showBasics;
        const onswitch = () => {
            store.dispatch(searchActions.tabSwitched())
        }
        return (
            <div class="column">
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