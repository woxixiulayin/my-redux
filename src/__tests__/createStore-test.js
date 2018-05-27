import createStore from '../createStore'
import { todos, initState } from './helper/reducers'

describe('test createStore', () => {

    let store

    beforeEach(() => {
        store = createStore(todos, initState)
    })

    it('should contain api', () => {
        expect(store.subscribe).toBeTruthy()
        expect(store.dispatch).toBeTruthy()
        expect(store.getState).toBeTruthy()
    })

    it('test getState', () => {
        expect(JSON.stringify(store.getState())).toBe(JSON.stringify(initState))
    })
})