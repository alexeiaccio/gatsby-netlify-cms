import React from 'react'
import { graphql } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import { css } from '@emotion/core'

import { HTMLContent } from './Content'
import { Img } from './Img'
import Views from './elements/views'
import { toLocalDate, uuid } from '../utils'
import { translite } from '../utils/makePath'

export const ArticleHeader = ({ article, date, id, location, tags }) => (
  <div>
    <div
      css={css`
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
        css={css`
          ${tw(['inline-flex', 'items-center'])};
        `}
      />
      {tags &&
        tags.map(tag => (
          <AniLink
            paintDrip
            hex="#0cf3ad"
            key={uuid()}
            to={translite(tag)}
            state={{ from: location.pathname }}
          >
            <span> {tag} ·</span>
          </AniLink>
        ))}
      <span> {toLocalDate(date)}</span>
      <span>
        <span> ·</span>
        {article.authors &&
          article.authors.map(
            ({ author }) =>
              author &&
              author.document.map(({ data }) => (
                <AniLink
                  paintDrip
                  hex="#0cf3ad"
                  key={uuid()}
                  to={translite(data.name)}
                  state={{ from: location.pathname }}
                >
                  <span> {data.name} ·</span>
                </AniLink>
              ))
          )}
      </span>
      <Views id={id} />
    </div>
    <figure
      css={css`
        ${tw(['mx-0', 'my-q48'])};
      `}
    >
      {article.image && <Img src={article.image} />}
      <figcaption>
        <HTMLContent
          css={css`
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
    id
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
