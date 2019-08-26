require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const { keys } = require('lodash')
const { CONFIG, SCHEMAS } = require('@krapiva-org/utils')
const { about, authors, index } = SCHEMAS

const apis = process.env.APIS ? JSON.parse(process.env.APIS) : null
const makeApiResolver = (repositoryName, accessToken) => {
  if (!repositoryName || !accessToken) { return }

  return {
    resolve: `gatsby-source-prismic`,
    options: {
      repositoryName,
      accessToken,
      linkResolver: ({ node, key, value }) => doc => `${doc}`,
      // linkResolver,
      // htmlSerializer,
      lang: '*',
      shouldNormalizeImage: () => true,
      schemas: {
        articles: require('./assets/schemas/articles.json'),
        authors,
      },
    },
  }
}

const apisResolvers = []

if (apis) {
  keys(apis).forEach(key => apisResolvers.push(makeApiResolver(key, apis[key])))
} else {
  apisResolvers.push(
    makeApiResolver(process.env.PRISMIC_API, process.env.PRISMIC_TOKEN)
  )
}

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
    ...apisResolvers,
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
