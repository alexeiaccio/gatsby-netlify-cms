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
  `gatsby-plugin-netlify-cache`,
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-sharp',
  `gatsby-transformer-sharp`,
  `gatsby-plugin-remove-serviceworker`,
  // `gatsby-plugin-offline`,
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
