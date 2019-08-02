require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require('path')
const { get, keys } = require('lodash')
const { htmlSerializer, linkResolver } = require('./src/utils/prismic')

const apis = process.env.APIS ? JSON.parse(process.env.APIS) : null
const makeApiResolver = (repositoryName, accessToken) => ({
  resolve: 'gatsby-source-prismic',
  options: {
    repositoryName,
    accessToken,
    linkResolver,
    htmlSerializer,
    lang: '*',
    shouldNormalizeImage: () => true,
    schemas: {
      about: require('./src/schemas/about.json'),
      articles: require('./src/schemas/articles.json'),
      authors: require('./src/schemas/authors.json'),
      index: require('./src/schemas/index.json'),
      reference: require('./src/schemas/reference.json'),
    },
  },
})
const apisResolvers = []

if (apis) {
  keys(apis)
  .forEach(key => apisResolvers.push(makeApiResolver(key, apis[key])))
} else {
  apisResolvers.push(makeApiResolver(process.env.PRISMIC_API, process.env.PRISMIC_TOKEN))
}

// SEO configuration
const siteTitle = '·К·Р·А·П·И·В·А·'
const siteUrl = 'https://www.krapiva.org'
const siteDescription =
  'К.Р.А.П.И.В.А. — это онлайн-издание о современном искусстве в Санкт-Петербурге. Наша основная задача — восполнить ощутимые пробелы в критическом и теоретическом осмыслении современной местной культурной ситуации, а также локальных историй искусств.'
const siteKeywords =
  'Культура, Ревью, Аналитика, Петербург, Искусство, Вовлечённость, Активизм'
const siteThemeColor = '#000000'

// Accounts & API keys
const twitter = ''
const fbAppId = '2138336363160205'

// Used internally
const utilsTitleShort = 'Krapiva'
const utilsIcon = 'static/images/icon.png'
const utilsBackgroundColor = '#000000'

module.exports = {
  siteMetadata: {
    // SEO
    siteTitle,
    siteUrl,
    siteDescription,
    siteKeywords,
    siteThemeColor,
    social: {
      twitter,
      fbAppId,
    },
    // Utils
    utilsTitleShort,
    utilsIcon: path.resolve(__dirname, utilsIcon),
    utilsBackgroundColor,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-transition-link',
      options: {
        layout: require.resolve(`./src/components/layout/index.js`),
      },
    },
    ...apisResolvers,
    {
      resolve: `gatsby-plugin-lunr`,
      options: {
        languages: [{ name: 'ru' }, { name: 'en' }],
        fields: [
          { name: 'authors', store: true, attributes: { boost: 20 } },
          { name: 'data', store: true },
          { name: 'tags', store: true, attributes: { boost: 10 } },
          { name: 'title', store: true, attributes: { boost: 30 } },
          { name: 'slug', store: true },
          { name: 'api', store: true },
        ],
        resolvers: {
          PrismicArticles: {
            authors: node =>
              get(node, 'data.authors', [])
                .map(({ author }) =>
                  get(author, 'document', []).map(({ data }) => data.name)
                )
                .join(':'),
            data: node => {
              const str = node.dataString
              const regexp = new RegExp('(?:text":")(.+?)(?:",")', 'gi')
              const arr = []
              let result
              // eslint-disable-next-line no-cond-assign
              while ((result = regexp.exec(str))) {
                arr.push(result[1])
              }
              return arr.join(' ').replace(/\\n?/g, '')
            },
            tags: node => node.tags.join(':'),
            title: node => node.data.title.text,
            slug: node => node.fields.slug,
            api: node => {
              const hrefRegexp = new RegExp('^(?:https?\:\/\/)(.+)(?:\.cdn)', 'g')
              const res = hrefRegexp.exec(node.href)
              return res[1]
            },
          },
        },
        filename: 'search_index.json',
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-netlify-cache`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteTitle,
        short_name: utilsTitleShort,
        start_url: '/',
        theme_color: siteThemeColor,
        background_color: utilsBackgroundColor,
        display: 'minimal-ui',
        icon: utilsIcon, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        mergeSecurityHeaders: true,
        mergeLinkHeaders: true,
        mergeCachingHeaders: true,
      },
    },
  ],
}
