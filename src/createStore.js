import isPlainObject from './utils/isPlainObject'

const ActionType = {
    INIT: 'INIT_ACTION'
}

const createStore = (reducer, initState) => {

    const listeners = []
    let currentState = initState

    if (typeof reducer !== 'function') {
        throw new TypeError('reducers should be an function')
    }
    
    if (!isPlainObject(initState)) {
        throw new TypeError('initState should be a plain object')
    }
    
    const subscribe = listener => {
        if (typeof reducer !== 'function') {
            throw new TypeError('listener should be an function')
        }

        listeners.push(listener)

        unsubscribe = () => {
            const index = listener.indexOf(listener)
            if (index > -1) {
                listener.splice(index, 1)
            }
        }

        return unsubscribe
    }

    const getState = () => currentState

    const dispatch = action => {
        const newState = reducer(currentState, action)

        currentState = newState

        listeners.forEach(listener => listener())
    }

    return {
        subscribe,
        getState,
        dispatch,
    }
}

export default createStore
