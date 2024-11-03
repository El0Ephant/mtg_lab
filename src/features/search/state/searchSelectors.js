import requestState from "./requestState"

export const selectUiShowBasics = state => (state.searchUi.showBasics)
export const selectUiSearch = state => (state.searchUi.search)
export const selectUiFormat = state => (state.searchUi.format)

export const selectNothingInProgress = state => 
    state.searchResult.basics.requestState !== requestState.inProgress && state.searchResult.nonBasics.requestState !== requestState.inProgress

export const selectBasics = state => (state.searchResult.basics.cards)
export const selectBasicsRequestState = state => (state.searchResult.basics.requestState)

export const selectNonBasics = state => (state.searchResult.nonBasics.cards)
export const selectNonBasicsRequestState = state => (state.searchResult.nonBasics.requestState)