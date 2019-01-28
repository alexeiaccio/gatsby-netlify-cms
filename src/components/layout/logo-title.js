import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import Link from '../elements/link'
import logo from '../../img/logo.svg'

const logoWrapperStyle = css`
  ${tw([
    'flex',
    'flex-row',
    'items-center',
    'justify-center',
    'overflow-hidden',
    'w-full',
  ])};
  transition: margin 16ms;
`

const logoStyles = css`
  ${tw(['bg-center', 'bg-contain', 'bg-no-repeat'])};
  background-image: url(${logo});
  height: 30px;
  transform: rotateZ(90deg);
  width: 60px;
`

const navStyles = css`
  ${tw([
    'flex',
    'flex-row',
    'justify-center',
    'mt-q8',
    'w-full',
    'sm:justify-between',
  ])};
`

const Title = styled.h1`
  ${tw([
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

function LogoTitle({ location, scroll, title }) {
  const LinkOrSpan =
    location && location === '/' ? Title : Title.withComponent(Link)
  const minusScroll = num =>
    `${num + scroll < 0 ? 0 : num + scroll >= num ? num : num + scroll}px`

  return (
    <>
      {scroll !== null && (
        <div
          css={css`
            ${logoWrapperStyle};
            height: ${location === '/' ? minusScroll(60) : 0};
            margin-bottom: ${location === '/' ? minusScroll(16) : 0};
            margin-top: ${location === '/' ? minusScroll(72) : 0};
            transition: height ${location === '/' ? 400 : 0}ms ease-out;
          `}
        >
          <div css={logoStyles} />
        </div>
      )}
      <nav
        css={css`
          ${navStyles};
          margin-bottom: ${scroll !== null && location === '/'
            ? minusScroll(16)
            : 0};
        `}
      >
        <LinkOrSpan to="/">{title}</LinkOrSpan>
      </nav>
    </>
  )
}

LogoTitle.propTypes = {
  location: PropTypes.string.isRequired,
  scroll: PropTypes.number,
  title: PropTypes.string.isRequired,
}

LogoTitle.defaultProps = {
  scroll: null,
}

export default memo(LogoTitle)
