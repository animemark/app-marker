const multipleEntry = require('react-app-rewire-multiple-entry')([
  {
    outPath: '/discuss/post-list.html',
    entry: 'src/entry/discuss.post-list.js',
    template: 'src/entry/template.html',
  },
  {
    outPath: '/marking/edit-mark.html',
    entry: 'src/entry/marking.edit-mark.js',
    template: 'src/entry/template.html',
  },
  {
    outPath: '/marking/mark-list.html',
    entry: 'src/entry/marking.mark-list.js',
    template: 'src/entry/template.html',
  },
  {
    outPath: '/profile/default.html',
    entry: 'src/entry/profile.default.js',
    template: 'src/entry/template.html',
  },
]);

module.exports = {
  webpack: function (config, env) {
    multipleEntry.addMultiEntry(config);
    return config;
  }
}