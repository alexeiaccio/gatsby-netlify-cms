/* global tw */
import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { css } from 'react-emotion'
import { injectGlobal } from 'emotion'

import Navbar from './Navbar'
import favicon from '../img/favicon.png'

injectGlobal`
  body {
    ${tw(['m-0', 'font-cormorant', 'font-medium'])};
  }
  a, a:hover {
    ${tw(['no-underline', 'text-green-dark'])}
  }
`

const Layout = ({ children }) => (
  <div>
    <Helmet title="К·Р·А·П·И·В·А">
      <link rel="icon" type="image/png" href={favicon} />
    </Helmet>
    <div
      className={css`
        ${tw([
          'bg-black',
          'md:bg-white',
          'border-4',
          'md:border-8',
          'border-white',
          'md:border-black',
          'border-solid',
          'fixed',
          'pin',
        ])};
      `}
    />
    <div
      className={css`
        ${tw([
          'border-2',
          'md:border-4',
          'border-white',
          'md:border-black',
          'border-solid',
          'fixed',
          'pin-b',
          'pin-l',
          'pin-r',
          'z-1000',
        ])};
      `}
    />
    <Navbar />
    <div
      className={css`
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
          'text-white',
          'md:text-black',
        ])};
      `}
    >
      {children}
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.object,
}

export default Layout
