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
  const slug = data.article.fields.slug
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
            date={data.article.first_publication_date}
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
  query ArticleBySlug($slug: String!) {
    article: prismicArticles(fields: { slug: { eq: $slug } }) {
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
    context: allPrismicArticles(
      filter: { data: { category: { ne: "afisha" } } },
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
