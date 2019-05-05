import { match as matchHost } from './adapters'
import { normalize } from './utils/url'
import * as Host from './host'

export function match (uri: string) {
  const url = normalize(uri)

  return matchHost(url)
}

export function retrieve (uri: string) {
  const adapter = match(uri)
  
  return Host.retrieve(uri, adapter)
}

async function main () {
  const targetDir = '~/Downloads/one-punch-man'
  const url = 'https://mangahosted.com/manga/one-punch-man-mh39222'

  const manga = await retrieve(url)
  console.log(manga, targetDir)
}

main()
  .catch(console.error.bind(console))
