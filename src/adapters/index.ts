import { URL } from 'url'
import { Adapter } from './adapter'

import { default as mangaHost } from './mangaHost'

export const adapters: { [key: string]: Adapter } = {
  mangaHost
}

export function match (uri: string): Adapter {
  const url = new URL(uri)
  const host = Object.values(adapters).find(({ hostnames }) => hostnames.includes(url.hostname))

  return host
}
