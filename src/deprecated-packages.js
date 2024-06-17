const semver = require('semver')
let deprecatedPackages = null

exports.isDeprecatedPackage = function (name, version) {
  if (deprecatedPackages == null) {
    let left
    deprecatedPackages = (left = require('../deprecated-packages')) != null ? left : {}
  }
  if (!deprecatedPackages.hasOwnProperty(name)) {
    return false
  }

  const deprecatedVersionRange = deprecatedPackages[name].version
  if (!deprecatedVersionRange) {
    return true
  }

  return (
    semver.valid(version) &&
    semver.validRange(deprecatedVersionRange) &&
    semver.satisfies(version, deprecatedVersionRange)
  )
}
