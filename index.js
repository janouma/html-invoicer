'use strict'

const minimist = require('minimist')
const render = require('es6-template-strings')
const { readFileSync, writeFileSync, unlink } = require('fs')
const { resolve } = require('path')
const puppeteer = require('puppeteer')

const params = minimist(process.argv.slice(2))
const { tmpl, data, out } = params

if (!tmpl) {
  throw new Error('"tmpl" argument is missing')
}

if (!data) {
  throw new Error('"data" argument is missing')
}

if (!out) {
  throw new Error('"out" argument is missing')
}

const html = String(readFileSync(tmpl))
const dataContent = require(resolve(data))

const rendered = render(
  html,
  {
    ...(typeof dataContent === 'function' ? dataContent(params) : dataContent),
    ...params
  }
)

const renderedPath = resolve(`${tmpl}.rendered.html`)

writeFileSync(renderedPath, rendered)

async function convert (url, destination) {
  let browser

  try {
    browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle2' })
    const pdf = await page.pdf({ format: 'Letter' })
    writeFileSync(destination, pdf)
  } catch (error) {
    console.error(error)
  } finally {
    browser && browser.close()
  }
}

convert(`file://${renderedPath}`, out)
  .finally(() => unlink(renderedPath, error => error && console.warn(error)))
