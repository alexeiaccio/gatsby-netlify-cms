const path = require('path')
const { makePath, makeAuthorPath } = require('./src/utils/makePath')
const lodash = require('lodash/fp')
const { get, uniqBy } = lodash

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const pageMaker = (type, data) => {
    data.map(({ node }) => {
      const { fields } = node
      const { slug } = fields
      createPage({
        component: path.resolve(`src/templates/${type}.js`),
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
      authors: allPrismicAuthors {
        edges {
          node {
            fields {
              slug
            }
            data {
              name
            }
          }
        }
      }
    }    
  `)

  const { edges: articles } = pages.data.articles
  const { edges: authors } = pages.data.authors

  const getCategoryPath = get(['node', 'data', 'category'])
  const getCategoriesList = uniqBy(getCategoryPath)
  const categories = getCategoriesList(articles).map(getCategoryPath)

  pageMaker('articles', articles)
  pageMaker('authors', authors)
  categoriesMaker(categories)
}

exports.onCreateNode = ({ node, actions }) => {
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
  if (node.internal.type === `PrismicAuthors`) {
    const { data } = node
    const value = makeAuthorPath(data.name)
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
