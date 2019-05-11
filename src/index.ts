import { match as matchHost } from './adapters'
import { normalize } from './utils/url'
import * as Host from './host'

export function match(href: string) {
  const url = normalize(href)

  return matchHost(url)
}

export function retrieve(href: string) {
  const url = normalize(href)
  const adapter = match(url)

  return Host.retrieve(url, adapter)
}

async function main() {
  const url = 'https://mangahosted.com/manga/one-punch-man-mh39222'

  const manga = await retrieve(url)
  console.log(manga)
}

main().catch(console.error.bind(console))
