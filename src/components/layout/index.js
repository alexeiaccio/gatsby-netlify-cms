import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Global, css } from '@emotion/core'
import { TransitionPortal } from 'gatsby-plugin-transition-link'

import globalStyles from './global-styles'
import Header from './header'

const borderStyles = css`
  ${tw([
    'border-2',
    'md:border-4',
    'border-black',
    'border-solid',
    'fixed',
    'z-1000',
  ])};
`

const containerStyles = css`
  ${tw([
    'flex',
    'flex-col',
    'items-center',
    'max-w-md',
    'mx-auto',
    'px-q12',
    'sm:px-q24',
    'md:px-q48',
    'py-q72',
    'relative',
    'text-black',
  ])};
`

class Layout extends PureComponent {
  render() {
    return (
      <>
        <Global styles={globalStyles} />
        <TransitionPortal level="top">
          <Header />
        </TransitionPortal>
        <div
          css={css`
            ${borderStyles}
            ${tw(['pin-b', 'pin-l', 'pin-r'])};
          `}
        />
        <div
          css={css`
            ${borderStyles}
            ${tw(['pin-t', 'pin-l', 'pin-r'])};
          `}
        />
        <div
          css={css`
            ${borderStyles}
            ${tw(['pin-t', 'pin-b', 'pin-r'])};
          `}
        />
        <div
          css={css`
            ${borderStyles}
            ${tw(['pin-t', 'pin-l', 'pin-b'])};
          `}
        />
        <main css={containerStyles} id="main-container">
          <div
            css={css`
              ${tw(['w-full'])};
            `}
          >
            {this.props.children}
          </div>
        </main>
      </>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.object,
}

export default Layout
