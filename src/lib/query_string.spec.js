const { queryString, parse } = require('./query_string')
describe('Object to query string', () => {
  it('Should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Leo',
      profession: 'developer',
    }
    expect(queryString(obj)).toBe('name=Leo&profession=developer')
  })

  it('Should create a valid query string when an array is provided', () => {
    const obj = {
      name: 'Leo',
      abilities: ['TDD', 'Arquitetura'],
    }
    expect(queryString(obj)).toBe('name=Leo&abilities=TDD,Arquitetura')
  })

  it('Should throw an error when an object is passed as values', () => {
    const obj = {
      name: 'Leo',
      abilities: { first: 'TDD', second: 'Arquitetura' },
    }
    expect(() => {
      queryString(obj)
    }).toThrowError()
  })
})

describe('Query string to object', () => {
  it('Should convert a query string to object', () => {
    const qs = 'name=Leo&profession=developer'
    expect(parse(qs)).toEqual({
      name: 'Leo',
      profession: 'developer',
    })
  })

  it('Should convert a query string of a single key-value', () => {
    const qs = 'name=Leo'
    expect(parse(qs)).toEqual({
      name: 'Leo',
    })
  })
})
