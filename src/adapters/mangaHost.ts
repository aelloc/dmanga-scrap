import { URL } from 'url'
import { addEventListener, create, destroy } from '../utils/jsdom'
import { Manga, Chapter, Page, MangaInfo } from '../manga'

async function retrieveChapterPages(chapter: Chapter): Promise<Page[]> {
  const jsdom = await create(chapter.url.href)
  await addEventListener(jsdom.window, 'load')

  const document = jsdom.window.document
  const elements = document.querySelectorAll('a.read-slide')
  const pages = Array.from(elements).map(
    (elem): Page => {
      const { value: dataReadHash } = elem.attributes.getNamedItem('data-read-hash')
      const img = elem.querySelector('img')
      const { value: src } = img.attributes.getNamedItem('src')

      return {
        number: Number.parseInt(dataReadHash, 10),
        src
      }
    }
  )

  destroy(jsdom)

  return pages
}

async function retrieveChapters(manga: Manga): Promise<Chapter[]> {
  const jsdom = await create(manga.url.href)
  await addEventListener(jsdom.window, 'load')

  const document = jsdom.window.document
  const elements = document.querySelectorAll('ul.list_chapters > li > a')
  const names = Array.from(elements)
    .reverse()
    .map((elem): string => elem.textContent)
  const chapters = names.map(
    (name): Chapter => {
      const { pathname } = new URL(name, manga.url.href)
      const url = new URL(pathname, manga.url.href)

      return {
        name,
        url
      }
    }
  )

  destroy(jsdom)

  return chapters
}

const hostnames = ['mangahost.net', 'mangahosted.com']

async function retrieveMangaInfo(manga: Manga): Promise<MangaInfo> {
  const jsdom = await create(manga.url.href)
  await addEventListener(jsdom.window, 'load')
  const document = jsdom.window.document

  function getDescription(key: string, description: any[]): Element {
    return description.find(
      (item): boolean => {
        const { textContent: name } = item.querySelector('strong')
        return name === key
      }
    )
  }
  const { textContent: name = '' } = document.querySelector('.title-widget h1.entry-title') || {}
  const description = Array.from(document.querySelectorAll('ul.descricao > li'))
  const { textContent: author = '' } = getDescription('Autor: ', description) || {}
  const { textContent: releaseYear = '' } = getDescription('Ano: ', description) || {}

  const year = Number.parseInt(releaseYear, 10)
  const release = new Date(year, 0)
  const info = {
    name,
    author,
    release
  }

  return info as MangaInfo
}

export default {
  hostnames,
  retrieve: {
    info: retrieveMangaInfo,
    chapters: retrieveChapters,
    chapterPages: retrieveChapterPages
  },
  end: () => Promise.resolve()
}
