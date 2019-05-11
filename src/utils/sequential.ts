export async function sequential<T>(
  operation: (value: T) => Promise<T>,
  pending: T[],
  resolved: T[] = []
): Promise<T[]> {
  if (pending.length === 0) {
    return resolved
  }

  const [actual] = pending.splice(0, 1)
  const value = await operation(actual)

  const complete = {
    ...actual,
    ...value
  }
  resolved.push(complete)

  return sequential(operation, pending, resolved)
}

export async function wrapInObject<T>(
  operation: (value: T) => Promise<any>,
  key: string,
  value: T
): Promise<{ [key: string]: T }> {
  const wrapped = {
    [key]: await operation(value)
  }

  return wrapped
}
