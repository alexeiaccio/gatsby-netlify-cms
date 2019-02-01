import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import get from 'lodash/get'

import Content from '../elements/content'
import Link from '../elements/link'
import Img from '../elements/img'
import Views from '../elements/views'
import { toLocalDate, uuid } from '../../utils'
import { translite } from '../../utils/makePath'

function ArticleHeader({ article, date, location, tags }) {
  const caption = get(article, 'caption.html')
  const image = get(article, 'image')
  return (
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
        <Views />
      </div>
      <figure
        css={css`
          ${tw(['mx-0', 'my-q48'])};
        `}
      >
        {image && <Img src={image} />}
        {caption && (
          <figcaption>
            <Content
              css={css`
                ${tw(['italic', 'text-center', 'text-list'])};
              `}
              content={caption}
            />
          </figcaption>
        )}
      </figure>
    </div>
  )
}

ArticleHeader.propTypes = {
  article: PropTypes.objectOf(PropTypes.any).isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default memo(ArticleHeader)

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
