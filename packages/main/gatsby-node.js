const path = require('path')
const get = require('lodash/get')
const compact = require('lodash/compact')
const { makePath, translite, getCategories } = require('@krapiva-org/utils')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const authorMaker = (data) => {
    data.map(({ node }) => {
      const { fields } = node
      const { slug } = fields
      createPage({
        component: path.resolve(`src/templates/author.tsx`),
        context: {
          slug,
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
      articles: allPrismicArticles(
        filter: {tags: {nin: ["Афиша"]}},
        limit: 2000,
      ) {
        edges {
          node {
            fields {
              slug
              tags
              authors
            }
            tags
            data {
              title {
                text
              }
              authors {
                author {
                  slug
                }
              }
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

  if (node && node.internal.type === `PrismicAuthors`) {
    const { data } = node
    createNodeField({
      node,
      name: `slug`,
      value: translite(decodeURI(data.name)),
    })
  }
  if (node && node.internal.type === `PrismicArticles`) {
    const { data, first_publication_date, tags } = node
    const authors = get(data, 'authors', [])

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
    createNodeField({
      node,
      name: `authors`,
      value: compact(authors.map(author => {
        const name = get(author, 'author.slug')
        return name? translite(decodeURI(name)) : null
      })) || [],
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

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
	const config = getConfig()
	config.node = {
		fs: 'empty',
	}
	actions.replaceWebpackConfig(config)
}
