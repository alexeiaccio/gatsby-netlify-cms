require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const utf8 = require('utf8')

const { htmlSerializer, linkResolver } = require('./src/utils/prismic')

module.exports = {
  siteMetadata: {
    title: 'Krapiva',
    siteUrl: 'https://www.krapiva.org',
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
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `·К·Р·А·П·И·В·А·`,
        short_name: `Krapiva`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#0cf3ad`,
        display: `minimal-ui`,
        icon: `src/img/logo-192-192.png`,
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
