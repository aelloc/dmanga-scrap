import { JSDOM, DOMWindow, Options } from 'jsdom'

export async function create(url: string, options?: Options): Promise<JSDOM> {
  const defaultOptions = {
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true
  }

  const opts = Object.assign({}, defaultOptions, options)
  return JSDOM.fromURL(url, opts)
}

export async function addEventListener(
  instance: DOMWindow | Document | Element,
  event: string,
  options?: boolean | AddEventListenerOptions
): Promise<void> {
  return new Promise((resolve) => {
    instance.addEventListener(event, (...args: any[]) => resolve(...args), options)
  })
}

export async function destroy(instance: JSDOM): Promise<void> {
  instance.window.close()
}
