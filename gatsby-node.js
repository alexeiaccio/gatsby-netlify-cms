const path = require('path')
const { makePath } = require('./src/utils/makePath')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const pageMaker = () => data => {
    data.edges.forEach(({ node }) => {
      const { fields, type } = node
      const { slug } = fields
      console.log(slug)
      createPage({
        component: path.resolve(`src/templates/${type}.js`),
        context: {
          slug: slug,
        },
        path: slug,
      })
    })
  }

  const pages = await graphql(`
    {
      allPrismicArticles(limit: 2000) {
        edges {
          node {
            type
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  for (const key in pages.data) {
    pageMaker(key)(pages.data[key])
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `PrismicArticles`) {
    const { data, first_publication_date } = node
    const value = makePath(data.title.text, first_publication_date)
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: 'babel-plugin-tailwind',
  })
}
