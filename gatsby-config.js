require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require('path')
const { htmlSerializer, linkResolver } = require('./src/utils/prismic')

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
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: process.env.PRISMIC_API,
        accessToken: process.env.PRISMIC_TOKEN,
        linkResolver,
        htmlSerializer,
      },
    },
    {
      resolve: `gatsby-plugin-lunr`,
      options: {
        languages: [{ name: 'ru' }, { name: 'en' }],
        fields: [
          { name: 'title', store: true },
          { name: 'data', store: true },
          { name: 'tags', store: true },
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
              return arr.join(' ').replace(/\\n?/g, '')
            },
            tags: node => node.tags.join(':'),
            title: node => node.data.title.text,
            slug: node => node.fields.slug,
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
    // {
    //   resolve: `gatsby-plugin-nprogress`,
    //   options: {
    //     color: `#0cf3ad`,
    //     parent: '#nprogress-container',
    //     showSpinner: false,
    //   },
    // },
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
