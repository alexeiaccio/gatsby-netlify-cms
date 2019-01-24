import React from 'react'
import { graphql, Link } from 'gatsby'
import { css } from '@emotion/core'

import { HTMLContent } from './Content'
import { Img } from './Img'
import { Views } from './Views'
import { toLocalDate, uuid } from '../utils'
import { translite } from '../utils/makePath'

export const ArticleHeader = ({ article, date, location, tags }) => (
  <div>
    <div
      className={css`
        ${tw([
          'font-montserrat',
          'italic',
          'leading-loose',
          'my-q24',
          'text-xs',
        ])};
      `}
    >
      <span
        className={css`
          ${tw(['inline-flex', 'items-center'])};
        `}
      />
      {tags &&
        tags.map(tag => (
          <Link
            key={uuid()}
            to={translite(tag)}
            state={{ from: location.pathname }}
          >
            <span> {tag} ·</span>
          </Link>
        ))}
      <span> {toLocalDate(date)}</span>
      <span>
        <span> ·</span>
        {article.authors &&
          article.authors.map(
            ({ author }) =>
              author &&
              author.document.map(({ data }) => (
                <Link
                  key={uuid()}
                  to={translite(data.name)}
                  state={{ from: location.pathname }}
                >
                  <span> {data.name} ·</span>
                </Link>
              ))
          )}
      </span>
      <Views {...{ location }} />
    </div>
    <figure
      className={css`
        ${tw(['mx-0', 'my-q48'])};
      `}
    >
      {article.image && <Img src={article.image} />}
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
    first_publication_date
    tags
    data {
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
        url
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
