import MtgMock from "../../../api/mtgMock";
import * as searchActions from "./searchActions";
import requestState from "./requestState";
import { produce } from "immer"

const initialState = {
    basics: {
        requestState: requestState.finished,
        cards: []
    },
    nonBasics: {
        requestState: requestState.finished,
        cards: []
    }
}

const mock = new MtgMock();

export default function searchResultReducer(state = initialState, action) {
    console.log(`Reducer action: ${action.type}`)
    switch (action.type) {
        case searchActions.SEARCH_REQUESTED:
            return produce(state, state => {
                state.nonBasics.requestState = requestState.inProgress;
            })
        case searchActions.SEARCH_SUCCEDED:
            return produce(state, state => {
                state.nonBasics.cards = action.payload;
                state.nonBasics.requestState = requestState.finished;
            })
        case searchActions.SEARCH_FAILED:
            return produce(state, state => {
                state.nonBasics.requestState = requestState.failed;
            })

        case searchActions.BASIC_SEARCH_REQUESTED:
            return produce(state, state => {
                state.basics.requestState = requestState.inProgress;
            })
        case searchActions.BASIC_SEARCH_SUCCEDED:
            return produce(state, state => {
                state.basics.cards = action.payload;
                state.basics.requestState = requestState.finished;
            })
        case searchActions.BASIC_SEARCH_FAILED:
            return produce(state, state => {
                state.basics.requestState = requestState.failed;
            })
        default:
            return state;
    }
}