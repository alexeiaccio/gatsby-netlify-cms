import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { StaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import get from 'lodash/get'

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

function Title({ handleClick, index, location, title }) {
  return (
    <nav css={navStyles}>
      {get(location, 'pathname') === '/' ? (
        <Heading onClick={handleClick}>{title}</Heading>
      ) : (
        <HeadingLink api={index.href} location={location} to="/">
          {title}
        </HeadingLink>
      )}
    </nav>
  )
}

Title.propTypes = {
  handleClick: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
}

Title.defaultProps = {
  handleClick: null,
}

function WithStaticQuery(props) {
  return (
    <StaticQuery
      query={graphql`
        query TitleQuery {
          index: prismicIndex {
            href
          }
        }
      `}
      render={({ index }) => <Title index={index} {...props} />}
    />
  )
}

export default memo(WithStaticQuery)
