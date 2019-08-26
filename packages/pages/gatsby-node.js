const path = require('path')
const get = require('lodash/get')
const { makePath, translite } = require('@krapiva-org/utils')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const articlesMaker = (data) => {
    data.map(({ node }) => {
      const { fields } = node
      const { slug, tags } = fields
      createPage({
        component: path.resolve(`src/templates/articles.tsx`),
        context: {
          slug: slug,
          tags: tags,
        },
        path: slug,
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
    }    
  `)

  const articles = get(pages, 'data.articles.edges')

  articles && articlesMaker(articles)
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
      value: tags ? tags.map(tag => translite(tag)) : [],
    })
  }
  if (node && node.internal.type === `PrismicAuthors`) {
    const { data } = node
    createNodeField({
      node,
      name: `slug`,
      value: translite(data.name),
    })
  }
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPreset({
    name: 'babel-preset-gatsby',
    options: {
      targets: {
        browsers: ['>0.25%', 'not dead'],
      },
    },
  })
  actions.setBabelPreset({
    name: '@emotion/babel-preset-css-prop',
  })
}
