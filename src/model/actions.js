const searchRequested = (name, format) => ({type: 'searchRequested', payload: {name: name, format: format}})
const cardAdded = (card) => ({type: 'cardAdded', payload: card})
const cardRemoved = (card) => ({type: 'cardRemoved', payload: card})
const tabSwitched = () => ({type: 'tabSwitched'})