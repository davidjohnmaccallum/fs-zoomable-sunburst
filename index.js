#!/usr/bin/env node
const fsFlare = require('./lib/fs-flare')
const fs = require('fs')

const [,,path = process.cwd()] = process.argv

const gitignore = getGitignore()

const data = fsFlare.run(path, gitignore)

console.log(JSON.stringify(data, null, 2))

function getGitignore() {
  const ignoreFilePath = `${path}/.gitignore`
  if (!fs.existsSync(ignoreFilePath)) return []
  const text = fs.readFileSync(ignoreFilePath, 'utf-8')
  return text.split("\n")
}