module.exports = {
  siteMetadata: {
    title: '·К·Р·А·П·И·В·А·',
    motto: ' · культура · ревью · аналитика · петербург · искусство · вовлеченность · активизм',
  },
  plugins: [
    'gatsby-theme-docz',
    'gatsby-plugin-emotion',
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
