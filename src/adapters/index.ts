import { URL } from 'url'
import { Adapter } from './adapter'

import mangaHost from './mangaHost'

export const adapters: { [key: string]: Adapter } = {
  mangaHost
}

export function match(href: string): Adapter {
  const url = new URL(href)
  const host = Object.values(adapters).find(
    ({ hostnames }): boolean => hostnames.includes(url.hostname)
  )

  return host
}
