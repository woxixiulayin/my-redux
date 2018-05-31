import isPlainObject from './isPlainObject'
import mapValues from './mapValues'

const actionType = 'get default state'

const combineReducers = reducers => {
    if (!isPlainObject(reducers)) {
        throw new TypeError('reducers should be a plain object')
    }

    if(!Object.values(reducers).every(item => typeof item === 'function')) {
        throw new TypeError(`combineReducers's reducers should be all function`)
    }

    // 创建默认值
    const defaultState = mapValues(reducers, (reducer, key) => reducer(undefined, {type: actionType}))

    const finalReducer = (state = defaultState, action) => {

        if (!isPlainObject(state)) {
            throw new TypeError('state should be a plain object')
        }
        // Object.keys(reducers).forEach(key => {
        //     newState[key] = reducers[key](state[key], action)
        // })
        const newState = mapValues(reducers, (reducer, key) => reducer(state[key], action))

        return newState
    }

    return finalReducer
}

export default combineReducers
