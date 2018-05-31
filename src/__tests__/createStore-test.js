import createStore from '../createStore'
import { todos, initTodos } from '../helper/reducers'
import { ADD_TODO, actionAdd } from '../helper/actionTypes'

describe('test createStore', () => {

    let store, listener

    beforeEach(() => {
        store = createStore(todos, initTodos)
        listener = jest.fn()
    })

    it('should contain api', () => {
        const methods = Object.keys(store)

        expect(methods).toContain('subscribe')
        expect(methods).toContain('dispatch')
        expect(methods).toContain('getState')
    })

    it('test getState', () => {
        expect(JSON.stringify(store.getState())).toBe(JSON.stringify(initTodos))
    })

    it('test dispatch', () => {
        const reducer = jest.fn().mockReturnValue({
            1: {
                id: 1,
                text: 'test dispatch'
            }
        })

        const store = createStore(reducer, initTodos)

        // 初始化时调用一次
        expect(reducer.mock.calls.length).toBe(1)
        expect(reducer.mock.calls[0][0]).toBe(initTodos)
        
        store.dispatch(actionAdd)
        
        const newState = store.getState()
        
        expect(newState !== initTodos).toBeTruthy()
        expect(reducer.mock.calls[1][1]).toBe(actionAdd)

    })

    it('test subscribe', () => {
        store.subscribe(listener)
        store.dispatch(actionAdd)

        expect(listener).toBeCalled()
    })
})