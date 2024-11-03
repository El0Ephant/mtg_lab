//ui
export const TAB_SWITCHED = 'tabSwitched'
export const tabSwitched = () => ({ type: TAB_SWITCHED })

export const SEARCH_FORMAT_CHANGED = 'searchFormatChanged'
export const searchFormatChanged = format => ({ type: SEARCH_FORMAT_CHANGED, payload: format })

export const SEARCH_TEXT_CHANGED = 'searchTextChanged'
export const searchTextChanged = text => ({ type: SEARCH_TEXT_CHANGED, payload: text })

// search
export const SEARCH_REQUESTED = 'searchRequested'
export const searchRequested = () => ({ type: SEARCH_REQUESTED })

export const SEARCH_SUCCEDED = 'searchSucceded'
export const searchSucceded = cards => ({ type: SEARCH_SUCCEDED, payload: cards })

export const SEARCH_FAILED = 'searchFailed'
export const searchFailed = message => ({ type: SEARCH_FAILED, payload: message })

// basic searchS
export const BASIC_SEARCH_REQUESTED = 'basicSearchRequested'
export const basicSearchRequested = () => ({ type: BASIC_SEARCH_REQUESTED })

export const BASIC_SEARCH_SUCCEDED = 'basicSearchSucceded'
export const basicSearchSucceded = cards => ({ type: BASIC_SEARCH_SUCCEDED, payload: cards })

export const BASIC_SEARCH_FAILED = 'basicSearchFailed'
export const basicSearchFailed = message => ({ type: BASIC_SEARCH_FAILED, payload: message })