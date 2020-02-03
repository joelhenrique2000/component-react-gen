var read = require('fs').readFileSync;
const ejs = require('ejs')
const jetpack = require('fs-jetpack');

module.exports = {
  generateUTF8: (opts) => {
    var path = opts.template;
    var ret = ejs.compile(read(path, 'utf8'), {filename: path})(opts.data);
    jetpack.file(opts.dest, { content: ret });
  }
};