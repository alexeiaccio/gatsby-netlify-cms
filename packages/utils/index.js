const { CONFIG } = require('./defaults/config')
const { APIS } = require('./defaults/apis')
const { MENU } = require('./defaults/menu')
const { SCHEMAS } = require('./schemas/index')
const { getCategories, makePath, translite } = require('./src/make-path')

module.exports = {
  APIS,
  CONFIG,
  MENU,
  SCHEMAS,

  getCategories,
  makePath,
  translite,
}
