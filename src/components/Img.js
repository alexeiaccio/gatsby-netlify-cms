/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import GatsbyImage from 'gatsby-image'

import logo from '../img/logo.svg'

const Holder = styled('div')`
  ${tw([
    'bg-grey-lighter',
    'h-full',
    'mb-q16',
    'overflow-hidden',
    'rounded-sm',
    'w-full',
  ])};
`

export const ImgHolder = props => (
  <Holder {...props}>
    <div
      className={css`
        ${tw(['bg-center', 'bg-no-repeat', 'h-q144', 'w-full'])};
        background-image: url(${logo});
        transform: rotateZ(135deg);
      `}
    />
  </Holder>
)

export const Img = ({ src, ...props }) => (
  <>
    {src.localFile && src.localFile.childImageSharp ? (
      src.localFile.childImageSharp.fluid ? (
        <GatsbyImage fluid={src.localFile.childImageSharp.fluid} {...props} />
      ) : (
        <GatsbyImage fixed={src.localFile.childImageSharp.fixed} {...props} />
      )
    ) : src.url ? (
      <img
        alt=""
        className={css`
          ${tw(['w-full'])};
        `}
        src={src.url}
      />
    ) : (
      <ImgHolder {...props} />
    )}
  </>
)
