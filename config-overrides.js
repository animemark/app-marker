const multipleEntry = require('react-app-rewire-multiple-entry')([
  {
    entry: 'src/entry/discuss.PostList.js',
    template: 'src/entry/template.html',
    outPath: '/discuss/PostList.html'
  },
  {
    entry: 'src/entry/marking.EditMark.js',
    template: 'src/entry/template.html',
    outPath: '/marking/EditMark.html'
  },
  {
    entry: 'src/entry/marking.MarkList.js',
    template: 'src/entry/template.html',
    outPath: '/marking/MarkList.html'
  },
]);

module.exports = {
  webpack: function (config, env) {
    multipleEntry.addMultiEntry(config);
    return config;
  }
}