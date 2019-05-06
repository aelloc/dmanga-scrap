import { URL } from 'url'
import { evaluate, close } from '../utils/browser'
import { Manga, Chapter, Page, MangaInfo } from '../manga'

async function retrieveChapterPages(chapter: Chapter): Promise<Page[]> {
  function selectPages(): Page[] {
    const elements = document.querySelectorAll('a.read-slide')
    const pages = Array.from(elements).map(
      (elem): Page => {
        const { value: dataReadHash } = elem.attributes.getNamedItem(
          'data-read-hash'
        )
        const img = elem.querySelector('img')
        const { value: src } = img.attributes.getNamedItem('src')

        return {
          number: parseInt(dataReadHash),
          src
        }
      }
    )

    return pages
  }

  const pages = await evaluate(chapter.url.href, selectPages)

  return pages
}

async function retrieveChapters(manga: Manga): Promise<Chapter[]> {
  function selectChapters(): string[] {
    const elements = document.querySelectorAll('ul.list_chapters > li > a')
    const chapters = Array.from(elements)
      .reverse()
      .map((elem): string => elem.textContent)

    return chapters
  }

  const names = await evaluate(manga.url.href, selectChapters)
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

  return chapters
}

const hostnames = ['mangahost.net', 'mangahosted.com']

async function retrieveMangaInfo(manga: Manga): Promise<MangaInfo> {
  function selectInfo(): MangaInfo {
    function getDescription(key: string, description: any[]): Element {
      return description.find(
        (item): boolean => {
          const { textContent: name } = item.querySelector('strong')
          return name === key
        }
      )
    }
    const { textContent: name = '' } =
      document.querySelector('.title-widget h1.entry-title') || {}
    const description = Array.from(
      document.querySelectorAll('ul.descricao > li')
    )
    const { textContent: author = '' } =
      getDescription('Autor: ', description) || {}
    const { textContent: releaseYear = '' } =
      getDescription('Ano: ', description) || {}

    const year = Number.parseInt(releaseYear, 10)
    const release = new Date(year, 0)
    return {
      name,
      author,
      release
    }
  }

  const info = await evaluate(manga.url.href, selectInfo)

  return info as MangaInfo
}

export default {
  hostnames,
  retrieve: {
    info: retrieveMangaInfo,
    chapters: retrieveChapters,
    chapterPages: retrieveChapterPages
  },
  end: close
}
