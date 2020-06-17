/* global describe, it */

var assert = require('assert')
var path = require('path')

var licensecheck = require('../index.js')

function replacer (key, value) {
  switch (key) {
    case 'licenseFile':
    case 'version':
      return undefined
  }
  return value
}
function removeLicenseFileKeys (object) {
  return JSON.parse(JSON.stringify(object, replacer))
}

describe('licensecheck', function () {
  it('licensecheck self', function () {
    var tree = removeLicenseFileKeys(licensecheck('.', path.resolve(__dirname, '..')))
    assert.deepEqual(
      tree,
      require('./self.json')
    )
  })

  it('licensecheck --dev', function () {
    var tree = removeLicenseFileKeys(licensecheck('.', path.resolve(__dirname, '..'), null, true))
    assert.deepEqual(
      tree,
      require('./self-dev.json')
    )
  })

  it('licensecheck mochajs', function () {
    var tree = removeLicenseFileKeys(licensecheck('.', path.resolve(__dirname, '../node_modules/mocha')))
    assert.deepEqual(
      tree,
      require('./mocha.json')
    )
  })
})
