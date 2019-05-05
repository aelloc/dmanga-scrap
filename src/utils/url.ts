export function normalize(url: string): string {
  if (url.lastIndexOf('/') === url.length - 1) {
    return url
  }

  return url + '/'
}
