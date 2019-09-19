const path = require('path')
const get = require('lodash/get')
const { makePath, translite } = require('@krapiva-org/utils')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const pages = await graphql(`
    {
      articles: allPrismicArticles(
        filter: { tags: { nin: ["Афиша"] } }
        limit: 2000
      ) {
        edges {
          node {
            fields {
              slug
            }
            first_publication_date(locale: "ru", formatString: "DD MMMM YYYY")
            date: first_publication_date
            tags
          }
        }
      }
    }
  `)

  const articles = get(pages, 'data.articles.edges')

  const articlesMaker = data => {
    data.map(({ node }) => {
      const { fields, date } = node
      const { slug, tags } = fields
      createPage({
        component: path.resolve(`src/templates/articles.tsx`),
        context: {
          slug: slug,
          tags: tags,
          date: date,
        },
        path: slug,
      })
    })
  }

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

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
	const config = getConfig()
	config.node = {
		fs: 'empty',
	}
	actions.replaceWebpackConfig(config)
}
