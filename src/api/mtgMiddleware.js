import { Mtg } from './mtg.js';
import * as searchActions from '../features/search/state/searchActions.js'
import * as searchSelectors from '../features/search/state/searchSelectors.js'

const mtg = new Mtg();

let saveTimer;
let debounceTime = 500;

const debounce = (callback) => {
  if (saveTimer) {
    clearTimeout(saveTimer);
  }

  saveTimer = setTimeout(async () => {
    await callback();
  }, debounceTime);
};


const mtgMiddleware = (store) => {
  return (next) => {
    return (action) => {
      console.log(`Middleware action: ${action.type}`)

      if (action.type === searchActions.SEARCH_REQUESTED) {
        next(action);
        console.log(`middleware search ${searchSelectors.selectUiSearch(store.getState())}`)
        mtg.loadCards({
          '-type': 'basic',
          'name': searchSelectors.selectUiSearch(store.getState()),
          'format': searchSelectors.selectUiFormat(store.getState())
        }).then(
          (cards) => {
            console.log(`search succeded ${searchSelectors.selectUiSearch(store.getState())}`)
            store.dispatch(searchActions.searchSucceded(cards))
          },

          (error) => {
            store.dispatch(searchActions.searchFailed(error))
          },
        )
        return;
      }

      if (action.type === searchActions.BASIC_SEARCH_REQUESTED) {
        next(action);
        console.log(`middleware basic search ${searchSelectors.selectUiSearch(store.getState())}`)
        const cards = mtg.loadCards({ 'type': 'basic' }).then(
          (cards) => {
            console.log(`middleware basic search succeded ${searchSelectors.selectUiSearch(store.getState())}`)
            store.dispatch(searchActions.basicSearchSucceded(cards))
          },

          (error) => {
            store.dispatch(searchActions.searchFailed(error))
          },
        )
        return;
      }

      return next(action);
    }


  };
};


export default mtgMiddleware;