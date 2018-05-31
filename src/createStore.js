import isPlainObject from './utils/isPlainObject'

const ActionType = {
    INIT: 'INIT_ACTION'
}

const createStore = (reducer, initState = {}) => {

    const listeners = []
    let currentState = initState
    let isDispatching = false

    if (typeof reducer !== 'function') {
        throw new TypeError('reducers should be an function')
    }
    
    // if (!isPlainObject(initState)) {
    //     throw new TypeError('initState should be a plain object')
    // }
    
    const subscribe = listener => {
        if (typeof listener !== 'function') {
            throw new TypeError('listener should be an function')
        }

        listeners.push(listener)

        const unsubscribe = () => {
            const index = listener.indexOf(listener)
            if (index > -1) {
                listener.splice(index, 1)
            }
        }

        return unsubscribe
    }

    const getState = () => currentState
    const getReducer = () => reducer

    const dispatch = action => {

        if(isDispatching) {
            throw new Error(`redux is still dispatching, ${action.type} will not be dispatched`)
        }

        isDispatching = true

        const newState = reducer(currentState, action)

        currentState = newState

        listeners.forEach(listener => listener(currentState))

        isDispatching = false
    }

    // 初始化
    dispatch(ActionType)

    return {
        subscribe,
        getState,
        getReducer,
        dispatch,
    }
}

export default createStore
