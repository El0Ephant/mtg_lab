import m from "mithril";
import App from "./app.js";
import {store} from "./store.js"

import * as searchActions from "./features/search/state/searchActions.js"
import * as searchSelectors from "./features/search/state/searchSelectors.js"

store.subscribe(()=>{
    console.log(store.getState().searchResult)
})

store.dispatch(searchActions.basicSearchRequested())
store.dispatch(searchActions.searchRequested())

const unsubscribe = store.subscribe(() => {
    if (searchSelectors.selectNothingInProgress(store.getState())) {
        m.mount(document.body, {
            view: function () {
                return m(App);
            }
        })
        unsubscribe();
    }
});

