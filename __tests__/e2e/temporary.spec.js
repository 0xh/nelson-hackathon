'use strict'

import puppeteer from 'puppeteer'

describe('temporary.spec.js', () => {
  let browser

  beforeEach(async () => {
    const config = require('@/config.json')

    browser = await puppeteer.launch({
      executablePath: config.CHROMIUM_BIN_PATH || '/usr/bin/chromium-browser',
      ignoreHTTPSErrors: true
    })
  })

  afterEach(async () => {
    browser.close()
  })

  it('temporary test to check puppeteer is working', async () => {
    const page = await browser.newPage()
    await page.goto('https://gateway.nelson.rn/')

    const pageTitle = await page.title()

    expect(pageTitle).toBe('NELSON - GATEWAY')

    Promise.resolve()
  }, 10000)
})
