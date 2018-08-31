/* global tw */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { css } from 'react-emotion'
import { startCase } from 'lodash'

import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import { getCategory, toLocalDate, uuid } from '../utils'

export default class TextPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: articles } = data.allPrismicArticles

    return (
      <Layout>
        <section>
          {articles.map(({ node }) => {
            const article = node.data
            return (
              <article
                className={css`
                  ${tw(['mb-q48'])};
                `}
                key={uuid()}
              >
                <h1>{article.title.text}</h1>
                <div
                  className={css`
                    ${tw(['font-montserrat', 'italic', 'mb-4', 'text-xs'])};
                  `}
                >
                  <span>{startCase(getCategory(article.category))}</span>
                  <span> · </span>
                  <span>{toLocalDate(article.date)}</span>
                  <span>
                    <span> ·</span>
                    {article.authors.map(({ author }) =>
                      author.document.map(({ data }) => (
                        <span key={uuid}> {data.name} ·</span>
                      ))
                    )}
                  </span>
                </div>
                <figure>
                  <Img
                    className={css`
                      ${tw(['-mx-8'])};
                    `}
                    fluid={article.image.localFile.childImageSharp.fluid}
                  />
                  <figcaption>
                    <HTMLContent
                      className={css`
                        ${tw(['italic', 'text-center', 'text-sm'])};
                      `}
                      content={article.caption.html}
                      key={uuid()}
                    />
                  </figcaption>
                </figure>
                <div>
                  {article.body
                    .reduceRight((acc, cur) => {
                      while (cur.__typename !== 'PrismicArticlesBodyCut') {
                        return acc.concat(cur)
                      }
                      return []
                    }, [])
                    .reverse()
                    .map(({ primary, __typename }) => (
                      <Fragment key={uuid()}>
                        {__typename === 'PrismicArticlesBodyText' && (
                          <HTMLContent
                            className={css`
                              ${tw(['mb-8', 'text-body'])};
                            `}
                            content={primary.text.html}
                            key={uuid()}
                          />
                        )}
                        {__typename === 'PrismicArticlesBodyQuote' && (
                          <Fragment key={uuid()}>
                            <HTMLContent
                              className={css`
                                ${tw(['px-8', 'text-heading6'])};
                              `}
                              content={primary.quote.html}
                              key={uuid()}
                            />
                            <HTMLContent
                              className={css`
                                ${tw([
                                  'italic',
                                  'px-8',
                                  'text-right',
                                  'text-sm',
                                ])};
                              `}
                              content={primary.cite.html}
                              key={uuid()}
                            />
                          </Fragment>
                        )}
                      </Fragment>
                    ))}
                </div>
                <Link to={node.fields.slug}>
                  <span
                    className={css`
                      ${tw([
                        'bg-white',
                        'hover:bg-black',
                        'inline-block',
                        'border',
                        'border-black',
                        'border-solid',
                        'font-montserrat',
                        'mt-4',
                        'p-2',
                        'text-black',
                        'hover:text-white',
                        'text-xs',
                      ])};
                      font-variant: all-petite-caps;
                      transition: all 200ms ease-in-out;
                    `}
                  >
                    Продолжение →
                  </span>
                </Link>
              </article>
            )
          })}
        </section>
      </Layout>
    )
  }
}

TextPage.propTypes = {
  data: PropTypes.shape({
    allPrismicArticles: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query TextQuery {
    allPrismicArticles(
      sort: { order: DESC, fields: [first_publication_date] }
    ) {
      edges {
        node {
          first_publication_date
          last_publication_date
          type
          fields {
            slug
          }
          data {
            title {
              text
            }
            category
            date
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
                  fluid(maxWidth: 1200, quality: 80) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            caption {
              html
            }
            body {
              __typename
              ... on PrismicArticlesBodyText {
                primary {
                  text {
                    html
                  }
                }
              }
              ... on PrismicArticlesBodyQuote {
                primary {
                  quote {
                    html
                  }
                  cite {
                    html
                  }
                }
              }
              ... on PrismicArticlesBodyCut {
                id
              }
            }
          }
        }
      }
    }
  }
`
