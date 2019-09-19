require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const { keys } = require('lodash')
const { CONFIG, SCHEMAS, linkResolver, plugins } = require('@krapiva-org/utils')
const { about, authors, index } = SCHEMAS

const apis = process.env.APIS ? JSON.parse(process.env.APIS) : null
const makeApiResolver = (repositoryName, accessToken) => {
  if (!repositoryName || !accessToken) { return }

  return {
    resolve: `gatsby-source-prismic`,
    options: {
      repositoryName,
      accessToken,
      linkResolver,
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

if (!process.env.DEV) {
  const host = APIS[process.env.PRISMIC_API]

  productionPlugins.push({
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      host: `https://${host}.krapiva.org`,
      sitemap: `https://${host}.krapiva.org/sitemap.xml`,
      policy: [
        { userAgent: 'Yandex', allow: '/' },
        { userAgent: '*', allow: '/' },
      ],
    },
  })
}

module.exports = {
  siteMetadata: {
    ...CONFIG,
    clientApi: process.env.SLS_API || false,
    origin: process.env.DEV ? 'dev-main' : 'www',
    special: process.env.SPECIAL || false,
    dev: process.env.DEV || false,
  },
  plugins: [
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: process.env.META_API,
        accessToken: process.env.META_TOKEN,
        linkResolver,
        schemas: {
          about,
          index,
        },
      },
    },
    ...apisResolvers,
    ...plugins,
    ...productionPlugins,
  ],
}
