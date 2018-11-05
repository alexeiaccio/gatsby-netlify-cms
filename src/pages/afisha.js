/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { ArticleHeader } from '../components/ArticleHeader'
import { ArticleBody } from '../components/ArticleBody'
import { Burn } from '../components/Burn'
import { Context } from '../components/Context'
import Layout from '../components/Layout'
import { Heading1 } from '../components/Typography'

const getContext = slug => ctx => {
  return ctx.edges.filter(({ node }) => node.fields.slug === slug)
}

const Article = ({ data, location }) => {
  const article = data.article.edges[0].node.data
  const slug = data.article.edges[0].node.fields.slug
  const context = getContext(slug)(data.context)

  return (
    <Layout image={article.image} {...{ location }} title={article.title.text}>
      <>
        <article
          className={css`
            ${tw(['my-q48'])};
          `}
        >
          <h1 className={Heading1}>{article.title.text}</h1>
          <ArticleHeader
            {...{ article }}
            date={data.article.edges[0].node.first_publication_date}
            {...{ location }}
          />
          <ArticleBody {...{ article }} />
          <Burn {...{ location }} />
        </article>
        <Context {...{ context }} />
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
  query AfishaQuery {
    article: allPrismicArticles(
      filter: { data: { category: { eq: "afisha" } } },
      sort: { order: DESC, fields: [first_publication_date] },
      limit: 1,
    ) {
      edges {
        node {
          ...ArticleHeader
          ...ArticleBody
          first_publication_date
          data {
            title {
              text
            }
          }
          fields {
            slug
          }
        }
      }
    }
    context: allPrismicArticles(
      sort: { order: DESC, fields: [first_publication_date] }
    ) {
      edges {
        next {
          fields {
            slug
          }
          first_publication_date
          data {
            title {
              text
            }
            category
            authors {
              author {
                document {
                  data {
                    name
                  }
                }
              }
            }
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 320, quality: 80) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        }
        previous {
          fields {
            slug
          }
          first_publication_date
          data {
            title {
              text
            }
            category
            authors {
              author {
                document {
                  data {
                    name
                  }
                }
              }
            }
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 320, quality: 80) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
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
