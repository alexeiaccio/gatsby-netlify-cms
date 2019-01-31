import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Global, css } from '@emotion/core'
import { TransitionPortal } from 'gatsby-plugin-transition-link'
import { API, graphqlOperation } from 'aws-amplify';

import globalStyles from './global-styles'
import Header from './header'
import { listKrapivas } from '../../graphql/queries'

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
    'relative',
    'text-black',
    'sm:px-q24',
    'md:px-q48',
  ])};
  will-change: padding-top;
`

class Layout extends PureComponent {
  async componentDidMount() {
    const { data, errors } = await API.graphql(graphqlOperation(listKrapivas))

      if (data) console.log(data.listKrapivas.items)
      if (errors) console.error(errors)
  }
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
