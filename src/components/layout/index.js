import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Global, css } from '@emotion/core'
import { TransitionPortal } from 'gatsby-plugin-transition-link'
import get from 'lodash/get'

import globalStyles from './global-styles'
import Header from './header'
import Seo from './seo'

const borderStyles = css`
  ${tw(['border-2', 'md:border-4', 'border-black', 'border-solid', 'fixed'])};
`

const containerStyles = css`
  ${tw([
    'flex',
    'flex-col',
    'items-center',
    'max-w-md',
    'mx-auto',
    'px-q12',
    'relative',
    'text-black',
    'sm:px-q24',
    'md:px-q48',
  ])};
`

class Layout extends PureComponent {
  render() {
    return (
      <>
        <Global styles={globalStyles} />
        <Seo
          data={get(this.props, 'data.seo.data')}
          pathname={get(this.props, 'location.pathname')}
        />
        <TransitionPortal level="top">
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
              ${borderStyles};
              ${tw(['pin-t', 'pin-l', 'pin-b'])};
            `}
          />
          <Header />
        </TransitionPortal>
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
