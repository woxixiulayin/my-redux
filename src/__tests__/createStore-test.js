import createStore from '../createStore'
import { todos, initState } from './helper/reducers'
import { ADD_TODO, actionAdd } from './helper/actionTypes'

describe('test createStore', () => {

    let store, listener

    beforeEach(() => {
        store = createStore(todos, initState)
        listener = jest.fn()
    })

    it('should contain api', () => {
        expect(store.subscribe).toBeTruthy()
        expect(store.dispatch).toBeTruthy()
        expect(store.getState).toBeTruthy()
    })

    it('test getState', () => {
        expect(JSON.stringify(store.getState())).toBe(JSON.stringify(initState))
    })

    it('test dispatch', () => {
        const reducer = jest.fn().mockReturnValue({
            1: {
                id: 1,
                text: 'test dispatch'
            }
        })

        const store = createStore(reducer, initState)

        // 初始化时调用一次
        expect(reducer.mock.calls.length).toBe(1)
        expect(reducer.mock.calls[0][0]).toBe(initState)
        
        store.dispatch(actionAdd)
        
        const newState = store.getState()
        
        expect(newState !== initState).toBeTruthy()
        expect(reducer.mock.calls[1][1]).toBe(actionAdd)

    })

    it('test subscribe', () => {
        store.subscribe(listener)
        store.dispatch(actionAdd)

        expect(listener).toBeCalled()
    })
})