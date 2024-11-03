import { combineReducers, createStore } from 'redux';
import deckReducer from './deck/deckReducer';
import searchReducer from './search/searchReducer';
const reducer = combineReducers({
  deck: deckReducer,
  search: searchReducer
});
const store = createStore(reducer);
//# sourceMappingURL=store.js.map