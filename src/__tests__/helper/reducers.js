import { ADD_TODO } from './actionTypes'

/* state结构 state = {
    id: {
        id: number,
        text: string
    },
    ...
} */

// 生成id
const id = state => Object.values(state).reduce((result, item) => item.id > result ? item.id : result) + 1


export const initState = {
    1: {
        test: 'first todo'
    }
}

export const todos = (state = initState, action) => {
    switch(action.type) {
    case ADD_TODO: {
        const newState = {...state}
        newState[id(state)] = action.payload.text
    }
    default:
        return state
    }
}
