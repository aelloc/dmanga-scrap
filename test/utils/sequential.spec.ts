import test from 'ava'
import * as sequential from '../../src/utils/sequential'

test('wrapInObject() box boolean into object', async (t) => {
  const input = {
    operation: async (value: boolean) => value,
    key: 'same',
    value: true
  }
  const expected = {
    same: true
  }
  const result = sequential.wrapInObject(input.operation, input.key, input.value)

  t.deepEqual(expected, await result)
})

test('wrapInObject() box number into object', async (t) => {
  const input = {
    operation: async (value: number) => value,
    key: 'same',
    value: 0
  }
  const expected = {
    same: 0
  }
  const result = sequential.wrapInObject(input.operation, input.key, input.value)

  t.deepEqual(expected, await result)
})

test('wrapInObject() box string into object', async (t) => {
  const input = {
    operation: async (value: string) => value,
    key: 'same',
    value: 'value'
  }
  const expected = {
    same: 'value'
  }
  const result = sequential.wrapInObject(input.operation, input.key, input.value)

  t.deepEqual(expected, await result)
})

test('wrapInObject() box object into object', async (t) => {
  const input = {
    operation: async (value: object) => value,
    key: 'same',
    value: {
      number: 1,
      string: '',
      boolean: true
    }
  }
  const expected = {
    same: {
      number: 1,
      string: '',
      boolean: true
    }
  }
  const result = sequential.wrapInObject(input.operation, input.key, input.value)

  t.deepEqual(expected, await result)
})

test('wrapInObject() re-throws error', async (t) => {
  const input = {
    operation: async (value: number) => {
      throw new Error('Operation error')
    },
    key: 'plus1',
    value: 0
  }
  const error = await t.throwsAsync(
    sequential.wrapInObject(input.operation, input.key, input.value)
  )

  t.is(error.message, 'Operation error')
})
