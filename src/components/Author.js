/* global tw */
import React from 'react'
import Img from 'gatsby-image'
import { css } from 'emotion'

import { HTMLContent } from '../components/Content'
import { RichTextSmall } from '../components/RichText'
import { Heading6 } from '../components/Typography'

export const Author = ({ author }) => (
  <div
    className={css`
      ${tw(['flex-no-shrink', 'mb-q72', 'mx-q16', 'text-black', 'w-full'])};
      max-width: calc(50% - 2rem);
    `}
  >
    <Img
      className={css`
        ${tw(['rounded-full'])};
      `}
      fluid={author.avatar.localFile.childImageSharp.fluid}
    />
    <div
      className={css`
        ${tw(['sm:pl-q36'])};
      `}
    >
      <h3
        className={css`
          ${Heading6};
          ${tw(['my-q48'])};
        `}
      >
        {author.name}
      </h3>
      {author.statement.html && (
        <HTMLContent
          className={RichTextSmall}
          content={author.statement.html}
        />
      )}
    </div>
  </div>
)
