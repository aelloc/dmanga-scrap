import { URL } from 'url'

export function normalize(href: string): string {
  const url = new URL(href)
  if (url.pathname.lastIndexOf('/') === -1) {
    url.pathname += '/'
  }

  return url.href
}
