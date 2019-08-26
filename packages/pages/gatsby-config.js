require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const { CONFIG, SCHEMAS } = require('@krapiva-org/utils')
const { about, authors, articles, index } = SCHEMAS

module.exports = {
  siteMetadata: { ...CONFIG },
  plugins: [
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: process.env.META_API,
        accessToken: process.env.META_TOKEN,
        linkResolver: ({ node, key, value }) => doc => `${doc}`,
        schemas: {
          about,
          index,
        },
      },
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: process.env.PRISMIC_API,
        accessToken: process.env.PRISMIC_TOKEN,
        linkResolver: ({ node, key, value }) => doc => `${doc}`,
        schemas: {
          authors,
          articles,
        },
      },
    },
    'gatsby-plugin-sharp',
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-theme-tailwindcss`,
      options: {
        postCssPlugins: [require('autoprefixer')],
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
  ],
}
