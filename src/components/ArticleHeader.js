/* global tw */
import React from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'
import { startCase } from 'lodash'

import { HTMLContent } from './Content'
import { Views } from './Views'
import { getCategory, toLocalDate, uuid } from '../utils'

export const ArticleHeader = ({ article, date }) => (
  <div>
    <div
      className={css`
        ${tw(['font-montserrat', 'italic', 'my-q36', 'text-xs'])};
      `}
    >
      <span>{startCase(getCategory(article.category))}</span>
      <span> · </span>
      <span>{toLocalDate(date)}</span>
      <span>
        <span> ·</span>
        {article.authors.map(({ author }) =>
          author.document.map(({ data }) => (
            <span key={uuid}> {data.name} ·</span>
          ))
        )}
      </span>
      <Views />
    </div>
    <figure
      className={css`
        ${tw(['mx-0', 'my-q48'])};
      `}
    >
      <Img fluid={article.image.localFile.childImageSharp.fluid} />
      <figcaption>
        <HTMLContent
          className={css`
            ${tw(['italic', 'text-center', 'text-list'])};
          `}
          content={article.caption.html}
          key={uuid()}
        />
      </figcaption>
    </figure>
  </div>
)

export const articleHeaderQuery = graphql`
  fragment ArticleHeader on PrismicArticles {
    data {
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
            fluid(maxWidth: 640, quality: 80) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
      caption {
        html
      }
    }
  }
`
