import createStore from '../createStore'
import { todos, initState } from './helper/reducers'

describe('test createStore', () => {
    it('should contain api', () => {
        const store = createStore(todos, initState)

        expect(store.subscribe).toBeTruthy()
        expect(store.dispatch).toBeTruthy()
        expect(store.getState).toBeTruthy()
    })
})