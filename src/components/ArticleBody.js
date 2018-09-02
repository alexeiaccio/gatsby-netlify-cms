/* global tw */
import React, { Fragment } from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'

import { HTMLContent } from '../components/Content'
import { RichText } from '../components/RichText'
import { LeadText } from '../components/Typography'
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
                ${tw(['italic', 'mb-q48', 'text-center', 'text-list'])};
              `}
              key={uuid()}
            >
              <HTMLContent content={primary.imagecaption.html} key={uuid()} />
            </figcaption>
          </figure>
        )}
        {__typename === 'PrismicArticlesBodyLead' && (
          <HTMLContent
            className={css`
              ${LeadText};
              ${tw(['mb-q48'])};
            `}
            content={primary.text.html}
            key={uuid()}
          />
        )}
        {__typename === 'PrismicArticlesBodyText' && (
          <HTMLContent
            className={RichText}
            content={primary.text.html}
            key={uuid()}
          />
        )}
        {__typename === 'PrismicArticlesBodyQuote' && (
          <div
            className={css`
              ${tw(['m-0'])};
              max-width: calc(100vw - 4rem);
            `}
            key={uuid()}
          >
            <HTMLContent
              className={css`
                ${LeadText};
                ${tw(['mb-q48'])};
              `}
              content={primary.quote.html}
              key={uuid()}
            />
            <HTMLContent
              className={css`
                ${tw(['mt-q36', 'mb-q48', 'text-right', 'text-body'])};
                & p {
                  ${tw(['leading-normal', 'm-0'])};
                }
              `}
              content={primary.cite.html}
              key={uuid()}
            />
          </div>
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
        ... on PrismicArticlesBodyLead {
          primary {
            text {
              html
            }
          }
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
