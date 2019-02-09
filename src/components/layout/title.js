import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import Link from '../elements/link'

const navStyles = css`
  ${tw([
    'flex',
    'flex-row',
    'justify-center',
    'mt-q8',
    'w-full',
    'sm:justify-between',
  ])};
  will-change: margin-bottom;
`

const Heading = styled.h1`
  ${tw([
    'cursor-pointer',
    'inline-block',
    'font-extrabold',
    'font-montserrat',
    'mx-auto',
    'my-0',
    'pt-q8',
    'select-none',
    'text-white',
    'text-mobile',
    'hover:text-green',
    'sm:pt-0',
    'sm:text-heading5',
  ])};
  letter-spacing: 0.3em;
  line-height: 1.45;
`

const HeadingLink = Heading.withComponent(Link)

function Title({ location, scroll, title }) {
  const handleClick = () => {
    if (window !== undefined) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 600)
    }
  }

  return (
    <nav css={navStyles}>
      {location === '/' ? (
        <Heading onClick={handleClick}>{title}</Heading>
      ) : (
        <HeadingLink to="/">{title}</HeadingLink>
      )}
    </nav>
  )
}

Title.propTypes = {
  location: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default memo(Title)
