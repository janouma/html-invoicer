#!/usr/bin/env node

'use strict'

const { execSync } = require('child_process')

const fullIcuPath = require.resolve('full-icu/icudt62l.dat')

const out = execSync(`NODE_ICU_DATA=${fullIcuPath} node index ${process.argv.slice(2).join(' ')}`)

process.stdout.write(out)
