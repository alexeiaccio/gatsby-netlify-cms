/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { startCase } from 'lodash'

import { Heading6 } from '../components/Typography'
import { getCategory, toLocalDate, uuid } from '../utils'

export const Dummy = () => (
  <div
    className={css`
      ${tw(['flex-no-shrink', 'w-full'])};
      max-width: calc(50% - 2rem);
    `}
  />
)

export const PreviewCard = ({ article }) => (
  <Link
    className={css`
      ${tw(['text-black', 'hover:text-black', 'w-full'])};
      &:hover h4 {
        ${tw(['text-green'])};
      }
    `}
    title={article.data.title.text}
    to={article.fields.slug}
  >
    <Img fluid={article.data.image.localFile.childImageSharp.fluid} />
    <div
      className={css`
        ${tw(['mt-q16'])};
      `}
    >
      <h4
        className={css`
          ${Heading6};
          ${tw(['mb-q12'])};
          transition: all 200ms ease-in-out;
        `}
      >
        {article.data.title.text}
      </h4>
      <span>{startCase(getCategory(article.data.category))}</span>
      <span> · </span>
      <span>{toLocalDate(article.first_publication_date)}</span>
      <span>
        <span> ·</span>
        {article.data.authors.map(({ author }) =>
          author.document.map(({ data }) => (
            <span key={uuid}> {data.name} ·</span>
          ))
        )}
      </span>
    </div>
  </Link>
)

export const Placeholder = () => (
  <>
    <div
      className={css`
        ${tw(['bg-green', 'h-q144', 'mb-q16', 'rounded-sm', 'w-full'])};
      `}
      key={uuid()}
    />
    <div
      className={css`
        ${tw(['bg-green', 'h-q24', 'mb-q16', 'rounded-sm', 'w-4/5'])};
      `}
      key={uuid()}
    />
    <div
      className={css`
        ${tw(['bg-green', 'h-q12', 'mb-q8', 'rounded-sm', 'w-3/5'])};
      `}
      key={uuid()}
    />
    <div
      className={css`
        ${tw(['bg-green', 'h-q12', 'mb-q8', 'rounded-sm', 'w-3/4'])};
      `}
      key={uuid()}
    />
    <div
      className={css`
        ${tw(['bg-green', 'h-q12', 'rounded-sm', 'w-3/5'])};
      `}
      key={uuid()}
    />
  </>
)
