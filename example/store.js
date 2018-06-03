import { createStore, combineReducers } from '../dist/my-redux'

const id = state => Object.keys(state).reduce((result, value) => {
    return value.id && result.id > value.id ? result.id : result + 1
}, 0)

const actionsNames = {
    TODO_ADD: 'TODO_ADD',
    TODO_DELETE: 'TODO_DELETE',
}

const todo_add = todo => ({
    type: actionsNames.TODO_ADD,
    payload: { todo }
})

const todo_delete = id => ({
    type: actionsNames.TODO_DELETE,
    payload: { id }
})

const actions = {
    todo_add,
    todo_delete
}

const byId = (state = {}, action) => {
    switch(action.type) {
    case actionsNames.TODO_ADD: {
        const newTodo = {
            id: id(state),
            todo: action.payload.todo
        }
        return {
            ...state,
            [newTodo.id]: newTodo
        }
    }
    default:
        return state
    }
}

const ids = (state = [], action) => {
    switch(action.type) {
    case actionsNames.TODO_ADD: {
        return [...state, id(state)]
    }
    default:
        return state
    }
}

const todoReducer = combineReducers({
    byId,
    ids
})

const store = createStore(todoReducer, {})

window.store = store

store.subscribe(state => console.log('state is', state))

export {
    actions,
    store
}