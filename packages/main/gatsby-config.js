require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Krapiva',
    prismicApi: process.env.PRISMIC_API,
  },
  // plugins: [
  //   {
  //     resolve: `gatsby-plugin-alias-imports`,
  //     options: {
  //       alias: {
  //         '@src': './src',
  //       },
  //       extensions: ['js'],
  //     },
  //   },
  // ],
}
