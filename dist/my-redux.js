'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isPlainObject = obj => {
    if (typeof obj !== 'object' || obj === null) {
        return false
    }

    let proto = Object.getPrototypeOf(obj);

    // 循环获取，proto最终为Object.prototype（比如一个类也是这样）
    while(Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }

    // 普通对象的prototype就是Object.prototype
    return Object.getPrototypeOf(obj) === proto
};

const ActionType = {
    INIT: 'INIT_ACTION'
};

const createStore = (reducer, initState = {}) => {

    const listeners = [];
    let currentState = initState;
    let isDispatching = false;

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

        listeners.push(listener);

        const unsubscribe = () => {
            const index = listener.indexOf(listener);
            if (index > -1) {
                listener.splice(index, 1);
            }
        };

        return unsubscribe
    };

    const getState = () => currentState;
    const getReducer = () => reducer;

    const dispatch = action => {

        if(isDispatching) {
            throw new Error(`redux is still dispatching, ${action.type} will not be dispatched`)
        }

        isDispatching = true;

        const newState = reducer(currentState, action);

        currentState = newState;

        listeners.forEach(listener => listener(currentState));

        isDispatching = false;
    };

    // 初始化
    dispatch(ActionType);

    return {
        subscribe,
        getState,
        getReducer,
        dispatch,
    }
};

const mapValues = (obj, fn) => Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key);
    return result
}, {});

const actionType = 'get default state';

const combineReducers = reducers => {
    if (!isPlainObject(reducers)) {
        throw new TypeError('reducers should be a plain object')
    }

    if(!Object.values(reducers).every(item => typeof item === 'function')) {
        throw new TypeError(`combineReducers's reducers should be all function`)
    }

    // 创建默认值
    const defaultState = mapValues(reducers, (reducer, key) => reducer(undefined, {type: actionType}));

    const finalReducer = (state = defaultState, action) => {

        if (!isPlainObject(state)) {
            throw new TypeError('state should be a plain object')
        }
        // Object.keys(reducers).forEach(key => {
        //     newState[key] = reducers[key](state[key], action)
        // })
        const newState = mapValues(reducers, (reducer, key) => reducer(state[key], action));

        return newState
    };

    return finalReducer
};

exports.createStore = createStore;
exports.combineReducers = combineReducers;
