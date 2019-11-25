#!/usr/bin/env node

'use strict'

const { execSync } = require('child_process')

const fullIcuPath = require.resolve('./icudt62l.dat')
const indexPath = require.resolve('./index')

const out = execSync(`NODE_ICU_DATA=${fullIcuPath} node ${indexPath} ${process.argv.slice(2).join(' ')}`)

process.stdout.write(out)
