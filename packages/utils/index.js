const { CONFIG } = require('./defaults/config')
const { APIS } = require('./defaults/apis')
const { plugins } = require('./defaults/gatsby')
const { MENU } = require('./defaults/menu')
const { SCHEMAS } = require('./schemas/index')
const { getCategories, makePath, translite } = require('./src/make-path')
const { htmlSerializer, linkResolver } = require('./src/prismic')
const { bytesToSize } = require('./src/bytes')

module.exports = {
  APIS,
  CONFIG,
  MENU,
  SCHEMAS,

  plugins,

  getCategories,
  makePath,
  translite,

  htmlSerializer,
  linkResolver,

  bytesToSize,
}
