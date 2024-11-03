const cardAdded = card => ({
  type: 'cardAdded',
  payload: card
});
const cardRemoved = card => ({
  type: 'cardRemoved',
  payload: card
});
const tabSwitched = () => ({
  type: 'tabSwitched'
});
const searchRequested = () => ({
  type: 'searchRequested'
});
const searchFormatChanged = format => ({
  type: 'searchFormatChanged',
  payload: format
});
const searchTextChanged = text => ({
  type: 'searchFormatChanged',
  payload: text
});
//# sourceMappingURL=actions.js.map