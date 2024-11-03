import * as searchActions from "./searchActions";
import { produce } from "immer"
const initialState = {
    showBasics: true,
    search: '',
    format: ''
}

export default function searchUiReducer(state = initialState, action) {
    switch (action.type) {
        case searchActions.TAB_SWITCHED:
            return produce(state, state => {
                state.showBasics = !state.showBasics
            })
        case searchActions.SEARCH_TEXT_CHANGED:
            return produce(state, state => {
                state.search = action.payload
            })
        case searchActions.SEARCH_FORMAT_CHANGED:
            return produce(state, state => {
                state.format = action.payload
            })
        default:
            return state;
    }
}