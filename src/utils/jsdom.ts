import { JSDOM, Options, VirtualConsole } from 'jsdom'

export async function create(url: string, options?: Options): Promise<JSDOM> {
  const defaultOptions = {
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
    virtualConsole: new VirtualConsole()
  }

  const opts = Object.assign({}, defaultOptions, options)
  return JSDOM.fromURL(url, opts)
}

export async function addEventListener(
  instance: EventTarget,
  event: string,
  options?: boolean | AddEventListenerOptions
): Promise<void> {
  return new Promise((resolve) => {
    const handler = (...args: any[]) => {
      instance.removeEventListener(event, handler, options)
      resolve(...args)
    }

    instance.addEventListener(event, handler, options)
  })
}

export async function destroy(instance: JSDOM): Promise<void> {
  instance.window.close()
}
