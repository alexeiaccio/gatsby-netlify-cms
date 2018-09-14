const path = require('path')
const { makePath } = require('./src/utils/makePath')
const lodash = require('lodash/fp')
const { get, uniqBy } = lodash

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const articlesMaker = data => {
    data.map(({ node }) => {
      const { fields } = node
      const { slug } = fields
      createPage({
        component: path.resolve(`src/templates/articles.js`),
        context: {
          slug: slug,
        },
        path: slug,
      })
    })
  }

  const categoriesMaker = data => {
    data.map(category => {
      createPage({
        component: path.resolve(`src/templates/categories.js`),
        context: {
          slug: category,
        },
        path: category,
      })
    })
  }

  const pages = await graphql(`
    {
      articles: allPrismicArticles(limit: 2000) {
        edges {
          node {
            fields {
              slug
            }
            data {
              category
            }
          }
        }
      }
    }
  `)

  const { edges: articles } = pages.data.articles

  const getCategoryPath = get(['node', 'data', 'category'])
  const getCategoriesList = uniqBy(getCategoryPath)
  const categories = getCategoriesList(articles).map(getCategoryPath)

  articlesMaker(articles)
  categoriesMaker(categories)
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
