const initialState = {
    colorData: [
        { color: 'W', count: 0 },
        { color: 'U', count: 0 },
        { color: 'B', count: 0 },
        { color: 'R', count: 0 },
        { color: 'G', count: 0 },
        { color: 'C', count: 0 }
    ],
    costData: [
        { cost: 0, count: 0 },
        { cost: 1, count: 0 },
        { cost: 2, count: 0 },
        { cost: 3, count: 0 },
        { cost: 4, count: 0 },
        { cost: 5, count: 0 },
        { cost: 6, count: 0 },
        { cost: '7+', count: 0}
    ],
    cards: {
        basics: [],
        nonBasics: []
    },
    ui: {
        basics: true,
        format: ''
    }
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'tabSwitched': {
            return {
                ...state,
                ui: {basics: !state.ui.basics}
            }
        }
        default:
            return state;
    }
}