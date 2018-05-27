const isPlainObject = obj => {
    if (typeof obj !== 'object' || obj === null) {
        return false
    }

    let proto = Object.getPrototypeOf(obj)

    // 循环获取，proto最终为Object.prototype（比如一个类也是这样）
    while(Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto)
    }

    // 普通对象的prototype就是Object.prototype
    return Object.getPrototypeOf(obj) === proto
}

export default isPlainObject
