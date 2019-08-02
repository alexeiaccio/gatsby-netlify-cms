import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import GatsbyImage from 'gatsby-image'
import get from 'lodash/get'

import logo from '../../img/logo.svg'

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

const Image = styled('img')`
  ${tw(['w-full'])};
`

export const ImgHolder = memo(props => (
  <Holder {...props}>
    <div
      css={css`
        ${tw(['bg-center', 'bg-no-repeat', 'h-q144', 'w-full'])};
        background-image: url(${logo});
        transform: rotateZ(135deg);
      `}
    />
  </Holder>
))

function Img({ src, ...props }) {
  const childImageSharp = get(src, 'localFile.childImageSharp')
  return (
    <>
      {childImageSharp ? (
        childImageSharp.fluid ? (
          <GatsbyImage fluid={childImageSharp.fluid} {...props} />
        ) : (
          <GatsbyImage fixed={childImageSharp.fixed} {...props} />
        )
      ) : src.url ? (
        <Image src={src.url} {...props} />
      ) : (
        <ImgHolder {...props} />
      )}
    </>
  )
}

Img.propTypes = {
  src: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default memo(Img)
