/* global tw */
import React, { Fragment } from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'

import { HTMLContent } from '../components/Content'
import { RichText } from '../components/RichText'
import { uuid } from '../utils'

export const ArticleBody = ({ article }) => (
  <div>
    {article.body.map(({ primary, __typename }) => (
      <Fragment key={uuid()}>
        {__typename === 'PrismicArticlesBodyImage' && (
          <figure key={uuid()}>
            <Img
              className={css`
                ${tw(['-mx-8'])};
              `}
              fluid={primary.imageimage.localFile.childImageSharp.fluid}
              key={uuid()}
            />
            <figcaption
              className={css`
                ${tw(['italic', 'text-center', 'text-list'])};
              `}
              key={uuid()}
            >
              <HTMLContent content={primary.imagecaption.html} key={uuid()} />
            </figcaption>
          </figure>
        )}
        {__typename === 'PrismicArticlesBodyText' && (
          <HTMLContent
            className={RichText}
            content={primary.text.html}
            key={uuid()}
          />
        )}
        {__typename === 'PrismicArticlesBodyQuote' && (
          <figure key={uuid()}>
            <blockquote
              className={css`
                ${tw(['m-0', 'text-heading5'])};
              `}
              key={uuid()}
            >
              <HTMLContent content={primary.quote.html} />
            </blockquote>
            <footer key={uuid()}>
              <cite
                className={css`
                  ${tw(['px-8', 'text-right', 'text-list'])};
                `}
                key={uuid()}
              >
                <HTMLContent content={primary.cite.html} key={uuid()} />
              </cite>
            </footer>
          </figure>
        )}
      </Fragment>
    ))}
  </div>
)

export const articleBodyQuery = graphql`
  fragment ArticleBody on PrismicArticles {
    data {
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
        ... on PrismicArticlesBodyImage {
          primary {
            imageimage {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 640, quality: 80) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            imagecaption {
              html
            }
          }
        }
      }
    }
  }
`
