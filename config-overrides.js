const multipleEntry = require('react-app-rewire-multiple-entry')([
  {
    entry: 'src/entry/light.js',
    template: 'public/index.html',
    outPath: '/light.html'
  },
  {
    entry: 'src/entry/dark.js',
    template: 'public/index.html',
    outPath: '/dark.html'
  }
]);

module.exports = {
  webpack: function (config, env) {
    multipleEntry.addMultiEntry(config);
    return config;
  }
}