const {CracoAliasPlugin, configPaths} = require('react-app-rewire-alias')

const aliasMap = configPaths('./jsconfig.paths.json') // or jsconfig.paths.json

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {alias: aliasMap}
    }
  ]
}
