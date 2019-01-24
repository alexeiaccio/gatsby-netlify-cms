import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Global, css } from '@emotion/core'
import { TransitionPortal } from 'gatsby-plugin-transition-link'

import globalStyles from './global-styles'
import Header from './header'

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
            ${tw([
              'border-4',
              'md:border-8',
              'border-black',
              'border-solid',
              'fixed',
              'pin',
            ])};
          `}
        />
        <div
          css={css`
            ${tw([
              'border-2',
              'md:border-4',
              'border-black',
              'border-solid',
              'fixed',
              'pin-b',
              'pin-l',
              'pin-r',
              'z-1000',
            ])};
          `}
        />
        <div
          css={css`
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
          `}
          id="nprogress-container"
        >
          <div
            css={css`
              ${tw(['w-full'])};
              box-sizing: border-box;
            `}
          >
            {this.props.children}
          </div>
        </div>
      </>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.object,
}

export default Layout
