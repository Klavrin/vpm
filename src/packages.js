const url = require('url')

// Package helpers
module.exports = {
  // Parse the repository in `name/owner` format from the package metadata.
  //
  // pack - The package metadata object.
  //
  // Returns a name/owner string or null if not parseable.
  getRepository(pack) {
    let repository
    if (pack == null) {
      pack = {}
    }
    if (
      (repository =
        (pack.repository != null ? pack.repository.url : undefined) != null
          ? pack.repository != null
            ? pack.repository.url
            : undefined
          : pack.repository)
    ) {
      const repoPath = url.parse(repository.replace(/\.git$/, '')).pathname
      const [name, owner] = Array.from(repoPath.split('/').slice(-2))
      if (name && owner) {
        return `${name}/${owner}`
      }
    }
    return null
  },

  // Determine remote from package metadata.
  //
  // pack - The package metadata object.
  // Returns a the remote or 'origin' if not parseable.
  getRemote(pack) {
    if (pack == null) {
      pack = {}
    }
    return (
      (pack.repository != null ? pack.repository.url : undefined) ||
      pack.repository ||
      'origin'
    )
  }
}
