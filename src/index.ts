import { match as matchHost } from './adapters'
import { normalize } from './utils/url'
import * as Host from './host'

export function match(uri: string) {
  const url = normalize(uri)

  return matchHost(url)
}

export function retrieve(uri: string) {
  const url = normalize(uri)
  const adapter = match(url)

  return Host.retrieve(url, adapter)
}

async function main() {
  const url = 'https://mangahosted.com/manga/one-punch-man-mh39222'

  const manga = await retrieve(url)
  console.log(manga)
}

main().catch(console.error.bind(console))
