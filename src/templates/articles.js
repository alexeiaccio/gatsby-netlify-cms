/* global tw */
import React, { Fragment } from 'react'
import { css } from 'react-emotion'
import PropTypes from 'prop-types'
import { startCase } from 'lodash'
import { graphql } from 'gatsby'

import { getCategory, toLocalDate, uuid } from '../utils'

import { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'

const Article = ({
  data: {
    prismicArticles: { data: article },
  },
}) => {
  return (
    <Layout>
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
        <div>
          {article.body.map(({ primary, __typename }) => (
            <Fragment key={uuid()}>
              {__typename === 'PrismicArticlesBodyText' && (
                <HTMLContent
                  className={css`
                    ${tw(['mb-8', 'text-body'])};
                  `}
                  content={primary.text.html}
                />
              )}
              {__typename === 'PrismicArticlesBodyQuote' && (
                <Fragment key={uuid()}>
                  <HTMLContent
                    className={css`
                      ${tw(['px-8', 'text-heading5'])};
                    `}
                    content={primary.quote.html}
                  />
                  <HTMLContent
                    className={css`
                      ${tw([
                        'font-montserrat',
                        'px-8',
                        'text-right',
                        'text-xxs',
                      ])};
                    `}
                    content={primary.cite.html}
                  />
                </Fragment>
              )}
            </Fragment>
          ))}
        </div>
      </article>
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
    prismicArticles(fields: { slug: { eq: $slug } }) {
      id
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
`
