const path = require('path')
const get = require('lodash/get')
const moment = require('moment')
const { makePath, translite, getCategories } = require('@krapiva-org/utils')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const pages = await graphql(`
    {
      events: allPrismicEvents(filter: {data: {start: {ne: "null"}}}) {
        edges {
          node {
            tags
            fields {
              slug
            }
            data {
              title {
                text
              }
              start
            }
          }
        }
      }
      places: allPrismicPlaces {
        edges {
          node {
            tags
            fields {
              slug
            }
            data {
              title {
                text
              }
            }
          }
        }
      }
    }
  `)

  const events = get(pages, 'data.events.edges')
  const places = get(pages, 'data.places.edges')

  const eventsMaker = data => {
    data.map(({ node }) => {
      const { fields } = node
      const { slug, tags } = fields
      createPage({
        component: path.resolve(`src/templates/events.tsx`),
        context: {
          slug: slug,
          tags: tags,
        },
        path: slug,
      })
    })
  }
  const placesMaker = data => {
    data.map(({ node }) => {
      const { fields } = node
      const { slug, tags } = fields
      createPage({
        component: path.resolve(`src/templates/places.tsx`),
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
  
  const categories = getCategories(events)

  events && eventsMaker(events)
  places && placesMaker(places)
  categories && categoriesMaker(categories)
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node && node.internal.type === `PrismicEvents`) {
    const { data, tags } = node
    createNodeField({
      node,
      name: `slug`,
      value: makePath(data.title.text, data.start),
    })
    createNodeField({
      node,
      name: `tags`,
      value: tags ? tags.map(tag => translite(tag)) : [],
    })
  }
  if (node && node.internal.type === `PrismicPlaces`) {
    const { data, tags } = node
    createNodeField({
      node,
      name: `slug`,
      value: translite(data.title.text),
    })
    createNodeField({
      node,
      name: `tags`,
      value: tags ? tags.map(tag => translite(tag)) : [],
    })
  }
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      today: moment().format(),
    },
  })
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
