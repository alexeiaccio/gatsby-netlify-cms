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
      max-width: calc(50% - 1rem);
    `}
  />
)

export const Preview = ({ article }) => (
  <Link
    className={css`
      ${tw([
        'flex-no-shrink',
        'mx-q16',
        'text-white',
        'md:text-black',
        'hover:text-green',
        'w-full',
      ])};
      max-width: calc(50% - 2rem);
      transition: all 200ms ease-in-out;
    `}
    title={article.data.title.text}
    to={article.fields.slug}
  >
    <Img fluid={article.data.image.localFile.childImageSharp.fluid} />
    <div
      className={css`
        ${tw(['mt-q12'])};
      `}
    >
      <h4
        className={css`
          ${Heading6};
          ${tw(['mb-q8'])};
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
