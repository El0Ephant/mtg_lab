import { combineReducers, createStore, applyMiddleware, compose} from 'redux'

import deckReducer from './features/deck/state/deckReducer'
import searchUiReducer from './features/search/state/searchUiReducer.js'
import searchResultReducer from './features/search/state/searchResultReducer.js'
import mtgMiddleware from './api/mtgMiddleware.js'

const reducer = combineReducers({
    deck: deckReducer,
    searchUi: searchUiReducer,
    searchResult: searchResultReducer
})

const enhancers = compose(
    applyMiddleware(
        mtgMiddleware
    ),
    window.navigator.userAgent.includes('Chrome') ?
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : compose,
);

export const store = createStore(
    reducer,
    undefined,
    enhancers
)
export default store;
