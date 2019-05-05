export type Page = {
  number: number,
  src: string
}

export type Chapter = {
  name: string
  url: URL
  pages?: Page[]
}

export type MangaInfo = {
  name?: string
  author?: string
  release?: Date
}

export type Manga = {
  url?: URL
  chapters?: Chapter[],
  info?: MangaInfo
}
