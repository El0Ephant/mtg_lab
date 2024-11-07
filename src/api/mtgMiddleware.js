import { Mtg } from './mtg.js';
import * as searchActions from '../features/search/state/searchActions.js'
import * as searchSelectors from '../features/search/state/searchSelectors.js'

const mtg = new Mtg();

let saveTimer;
const debounceTime = 500;

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
    return async (action) => {

      if (action.type === searchActions.SEARCH_REQUESTED) {
        next(action);

        try {

          debounce(async () => {
            const cards = await mtg.loadCards({
              '-type': 'basic',
              'name': searchSelectors.selectUiSearch(store.getState()),
              'format': searchSelectors.selectUiFormat(store.getState())
            })
            store.dispatch(searchActions.searchSucceded(cards))
          })


        }
        catch (error) {
          store.dispatch(searchActions.searchFailed(error))
        }
        return;
      }

      if (action.type === searchActions.BASIC_SEARCH_REQUESTED) {
        next(action);
        try {
          const cards = await mtg.loadCards({ 'type': 'basic' })
          store.dispatch(searchActions.basicSearchSucceded(cards))
        }
        catch (error) {
          store.dispatch(searchActions.searchFailed(error))
        }

        return;
      }

      return next(action);
    }


  };
};


export default mtgMiddleware;