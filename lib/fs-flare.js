const fs = require('fs')
const pathLib = require('path')
const ignore = require('ignore')

/**
 * Build output data structure.
 */
function run(path, ignorePatterns = []) {

  if (_isFile(path)) {
    return {
      name: _basename(path), 
      value: _lineCount(path)
    }
  } else {
    const children = _getChildren(path, ignorePatterns)
    const childrenMapped = children.map(child => run(child, ignorePatterns))
    return {
      name: _basename(path),
      children: childrenMapped
    }
  }

}

function _isFile(path) {
  const stats = fs.lstatSync(path)
  return stats.isFile()
}

function _basename(path) {
  return pathLib.basename(path)
}

function _lineCount(path) {
  const text = fs.readFileSync(path, 'utf-8')
  return text.split("\n").length
}

function _getChildren(path, ignorePatterns = []) {
  const ig = ignore().add(ignorePatterns)
  const items = fs.readdirSync(path).filter(it=>it!=='.git')
  const paths = items.map(item => {
    const relPath = pathLib.relative(process.cwd(), `${path}/${item}`)
    const isDir = !_isFile(relPath)
    return `${relPath}${isDir ? '/' : ''}`
  })
  const notIgnored = ig.filter(paths)
  return notIgnored
}

module.exports = {
  run, _isFile, _basename, _lineCount, _getChildren
}