require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const { get, keys } = require('lodash')
const { APIS, CONFIG, SCHEMAS, linkResolver, plugins } = require('@krapiva-org/utils')
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

const productionPlugins = []

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
    {
      resolve: `gatsby-plugin-lunr`,
      options: {
        languages: [{ name: 'ru' }, { name: 'en' }],
        b: 0,
        fields: [
          { name: 'data', store: true },
          { name: 'slug', store: true },
        ],
        resolvers: {
          PrismicArticles: {
            data: node => {
              const str = node.dataString
              const regexp = new RegExp('(?:text":")(.+?)(?:",")', 'gi')
              const arr = []
              let result
              // eslint-disable-next-line no-cond-assign
              while ((result = regexp.exec(str))) {
                arr.push(result[1])
              }
              return arr.join(' ').replace(/\\n?/g, '').toLowerCase()
            },
            slug: node => node.fields.slug,
          },
        },
        filename: 'search_index.json',
      },
    },
    ...apisResolvers,
    {
      resolve: `gatsby-theme-tailwindcss`,
      options: {
        postCssPlugins: [require('autoprefixer')],
        emotionOptions: {
          autoLabel: true,
          labelFormat: `${process.env.PRISMIC_API}--[local]`,
        }
      },
    },
    ...plugins,
    ...productionPlugins,
  ],
}
