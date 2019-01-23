const path = require('path')
const { makePath, makeAuthorPath, getCategories } = require('./src/utils/makePath')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const pageMaker = (type, data) => {
    data.map(({ node }) => {
      const { fields } = node
      const { slug, tags } = fields
      createPage({
        component: path.resolve(`src/templates/${type}.js`),
        context: {
          slug: slug,
          tags: tags,
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
      articles: allPrismicArticles(
        limit: 2000,
      ) {
        edges {
          node {
            fields {
              slug
            }
            tags
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
  
  const categories = getCategories(articles)

  pageMaker('articles', articles)
  pageMaker('authors', authors)
  categoriesMaker(categories)
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node && node.internal.type === `PrismicArticles`) {
    const { data, first_publication_date, tags } = node
    createNodeField({
      node,
      name: `slug`,
      value: makePath(data.title.text, first_publication_date),
    })
    createNodeField({
      node,
      name: `tags`,
      value: tags.map(tag => makeAuthorPath(tag)),
    })
  }
  if (node && node.internal.type === `PrismicAuthors`) {
    const { data } = node
    createNodeField({
      node,
      name: `slug`,
      value: makeAuthorPath(data.name),
    })
  }
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: 'babel-plugin-tailwind',
  })
}
