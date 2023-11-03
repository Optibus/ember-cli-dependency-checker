'use strict';

class Package {
  constructor(name, versionSpecified, versionInstalled, path) {
    this.name = name;
    this.path = path;
    this.versionSpecified = versionSpecified;
    this.versionInstalled = versionInstalled;

    try {
      this.needsUpdate = this.updateRequired();
      this.isSymlinked = this.symlinked();
    } catch (e) {
      const versionText = '(version specified: ' + versionSpecified + ', version installed: ' + versionInstalled + '): ';
      e.message = 'Failed processing module "' + name + '" ' + versionText + e.message;
      throw e;
    }
  }

  updateRequired() {
    const VersionChecker = require('./version-checker');
    return !VersionChecker.satisfies(this.versionSpecified, this.versionInstalled);
  }

  symlinked() {
    const checkIsSymlink = require('./utils/is-symlink');
    const isSymlink = checkIsSymlink(this.path);
    if (isSymlink && isSymlink.match('pnpm')) {
      return false;
    }
    return !!isSymlink;
  }
}

module.exports = Package;
