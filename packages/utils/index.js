const config = require('./defaults/config')
const { getCategories, makePath, translite } = require('./src/make-path')

module.exports = {
  config,

  getCategories,
  makePath,
  translite,
}
