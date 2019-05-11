import test from 'ava'
import * as url from '../../src/utils/url'

test('normalize() append trailing "/"', (t) => {
  const values = {
    input: 'https://example.org',
    expected: 'https://example.org/'
  }
  const result = url.normalize(values.input)

  t.is(result, values.expected)
})

test('normalize() keeps the value', (t) => {
  const values = {
    input: 'https://example.org/',
    expected: 'https://example.org/'
  }
  const result = url.normalize(values.input)

  t.is(result, values.expected)
})
