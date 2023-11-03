const fs = require('fs');

module.exports = function isSymlink(path) {
  if (fs.existsSync(path)) {
    const stats = fs.lstatSync(path);
    const isSymbolicLink = stats.isSymbolicLink();
    if (isSymbolicLink) {
      return fs.readlinkSync(path);
    }
    return false;
  } else {
    return false;
  }
};
