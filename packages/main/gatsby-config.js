require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Krapiva',
    prismicApi: process.env.PRISMIC_API,
  },
  plugins: ['gatsby-plugin-theme-ui']
}
