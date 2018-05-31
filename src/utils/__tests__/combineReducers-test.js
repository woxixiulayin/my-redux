import { todos, todoByIds, initTodos, initTodoByIds } from '../../helper/reducers'
import { actionAdd } from '../../helper/actionTypes'
import combineReducers from '../combineReducers'

describe('test combineReducers', () => {
    let reducer

    beforeEach(() => {
        reducer = combineReducers({
            todos,
            todoByIds
        })

    })

    it('test exception', () => {
        expect(typeof reducer === 'function').toBeTruthy()

        try {
            const state = reducer(null, {type: 'test'})
        } catch (e) {
            expect(e).toBeInstanceOf(TypeError)
        }

    })

    it('test reduce correct', () => {
        expect(typeof reducer === 'function').toBeTruthy()
        const state = reducer(undefined, {type: 'test'})

        expect(state.todos).toBe(initTodos)
        expect(state.todoByIds).toBe(initTodoByIds)
    })
})