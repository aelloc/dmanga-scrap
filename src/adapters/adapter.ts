import { Manga, Chapter, Page, MangaInfo } from '../manga'

export type retrieveMangaInfo = (manga: Manga) => Promise<MangaInfo>
export type retrieveMangaChapters = (manga: Manga) => Promise<Chapter[]>
export type retrieveChapterPages = (chapter: Chapter) => Promise<Page[]>

export interface Adapter {
  hostnames: string[];
  retrieve: {
    info: retrieveMangaInfo;
    chapters: retrieveMangaChapters;
    chapterPages: retrieveChapterPages;
  };
  end: () => Promise<void>;
}
