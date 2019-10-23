const { CONFIG } = require('./config')
const {
  siteTitle,
  utilsTitleShort,
  siteThemeColor,
  utilsBackgroundColor,
  utilsIcon,
} = CONFIG

exports.plugins = [
  {
    resolve: `gatsby-plugin-typescript`,
    options: {
      isTSX: true, // defaults to false
      jsxPragma: `jsx`, // defaults to "React"
      allExtensions: true, // defaults to false
    },
  },
  {
    resolve: `gatsby-plugin-env-variables`,
    options: {
      whitelist: [
        'SLS_API',
        'PRISMIC_API',
        'SPECIAL',
        'DEV',
        'SHEET_ID'
      ]
    },
  },
  `gatsby-plugin-netlify-cache`,
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-sharp',
  `gatsby-transformer-sharp`,
  {
    resolve: 'gatsby-plugin-mailchimp',
    options: {
      endpoint:
        'https://krapiva.us19.list-manage.com/subscribe/post?u=4076a0aa3adcc8abda830e362&amp;id=9c438f0938',
    },
  },
  // `gatsby-plugin-remove-serviceworker`,
  // `gatsby-plugin-offline`,
  {
    resolve: `gatsby-plugin-offline`,
    options: {
        importWorkboxFrom: `cdn`,
      },
  },
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
]
