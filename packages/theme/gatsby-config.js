module.exports = {
  plugins: [
    'gatsby-theme-docz',
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-theme-tailwindcss`,
      options: {
        postCssPlugins: [require('autoprefixer')],
      },
    },
  ],
}
