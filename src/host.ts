import { URL } from 'url'
import { Manga } from './manga'
import { Adapter } from './adapters/adapter'
import { sequential, wrapInObject } from './utils/sequential'

export async function retrieve (url: string, adapter: Adapter): Promise<Manga> {
  const target = new URL(url)

  const info = await adapter.retrieve.info({ url: target })
  const chapters = await adapter.retrieve.chapters({ url: target })

  const retrieveChapterPagesWrapped = wrapInObject.bind(undefined, adapter.retrieve.chapterPages, 'pages')
  const manga = {
    url: target,
    info,
    chapters: await sequential(retrieveChapterPagesWrapped, chapters)
  }

  await adapter.end()

  return manga
}
