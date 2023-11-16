const { sum } = require('./calculator')
describe('Calculator test', () => {
  it('Should sum 2 and 2 and the result must be 4', () => {
    expect(sum(2, 2)).toBe(4)
  })

  it('Should sum 2 and 2 even if one of them ias a string and the result must be 5', () => {
    expect(sum('2', '2')).toBe(4)
  })

  it('Should throw an error if what is provided to the method cannot be sum', () => {
    expect(() => {
      sum('', '2')
    }).toThrow('Please check your input')

    expect(() => {
      sum([2, 2])
    }).toThrow('Please check your input')

    expect(() => {
      sum({})
    }).toThrow('Please check your input')

    expect(() => {
      sum()
    }).toThrow('Please check your input')
  })
})
