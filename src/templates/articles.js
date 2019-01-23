/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { ArticleHeader } from '../components/ArticleHeader'
import { ArticleBody } from '../components/ArticleBody'
import { Context } from '../components/Context'
import { Heading1 } from '../components/Typography'
import Layout from '../components/Layout'
import { Burn } from '../components/Burn'

const getContext = slug => ctx => {
  return ctx.edges.filter(({ node }) => node.fields.slug === slug)
}

const Article = ({ data, location }) => {
  const article = data.article.data
  const tags = data.article.tags.filter(tag => tag.search(/\d/) === -1)
  const slug = data.article.fields.slug
  const context = getContext(slug)(data.context)
  const isAfisha = article.category === 'afisha'

  return (
    <Layout image={article.image} {...{ location }} title={article.title.text}>
      <>
        <article
          className={css`
            ${tw(['my-q48', 'relative'])};
          `}
        >
          <h1 className={Heading1}>{article.title.text}</h1>
          <ArticleHeader
            {...{ article }}
            date={data.article.first_publication_date}
            {...{ location }}
            {...{ tags }}
          />
          <ArticleBody {...{ article }} />
          <Burn {...{ location }} />
        </article>
        {!isAfisha && <Context {...{ context }} />}
      </>
    </Layout>
  )
}

Article.propTypes = {
  data: PropTypes.shape({
    prismicArticles: PropTypes.object,
  }),
}

export default Article

export const pageQuery = graphql`
  query ArticleBySlug($slug: String!) {
    article: prismicArticles(fields: { slug: { eq: $slug } }) {
      ...ArticleHeader
      ...ArticleBody
      data {
        title {
          text
        }
      }
      fields {
        slug
      }
    }
    context: allPrismicArticles(
      filter: { tags: { nin: "Афиша" } }
      sort: { order: DESC, fields: [first_publication_date] }
    ) {
      edges {
        next {
          fields {
            slug
          }
          ...ArticleHeader
          data {
            title {
              text
            }
          }
        }
        previous {
          fields {
            slug
          }
          ...ArticleHeader
          data {
            title {
              text
            }
          }
        }
        node {
          fields {
            slug
          }
        }
      }
    }
  }
`
