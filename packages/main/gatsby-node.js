require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require('path')
const get = require('lodash/get')
const { makePath, translite, getCategories } = require('@krapiva-org/utils')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const authorMaker = (data) => {
    data.map(({ node }) => {
      const { fields } = node
      const { slug, tags } = fields
      createPage({
        component: path.resolve(`src/templates/author.tsx`),
        context: {
          slug: slug,
          tags: tags,
        },
        path: slug,
      })
    })
  }

  const categoriesMaker = (data) => {
    data.map(category => {
      createPage({
        component: path.resolve(`src/templates/category.tsx`),
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

  const articles = get(pages, 'data.articles.edges')
  const authors = get(pages, 'data.authors.edges')
  
  const categories = getCategories(articles)

  authors && authorMaker(authors)
  categories && categoriesMaker(categories)
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
