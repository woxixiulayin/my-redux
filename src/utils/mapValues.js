const mapValues = (obj, fn) => Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key)
    return result
}, {})

export default mapValues