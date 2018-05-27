import isPlainObject from '../isPlainObject'

describe('test', () => {
    it('should check plain object right', () => {
        const obj = {
            name: 'test'
        }
        expect(isPlainObject(obj)).toBe(true)
    })
    it('should check unPlain object right', () => {
        function Duck() {
            name: 'duck'
        }
        const obj = new Duck()

        expect(isPlainObject(obj)).toBe(false)
    })
})