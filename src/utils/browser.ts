import puppeteer from 'puppeteer'

let browser: puppeteer.Browser

export async function instance (): Promise<puppeteer.Browser> {
  if (!browser) {
    browser = await puppeteer.launch()
  }

  return browser
}

export async function newPage (): Promise<puppeteer.Page> {
  const browser = await instance()

  return browser.newPage()
}

export async function evaluate<T> (url: string, fn: () => T): Promise<T> {
  const page = await newPage()
  await page.goto(url)

  const result = await page.evaluate(fn)

  await page.close()

  return result
}

export async function close (): Promise<void> {
  await browser.close()

  browser = null
}
