/* global tw */
import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { css } from 'react-emotion'

import Navbar from './Navbar'

const Layout = ({ children }) => (
  <div>
    <Helmet title="К·Р·А·П·И·В·А" />
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
          'max-w-lg',
          'mx-auto',
          'px-4',
          'sm:px-8',
          'py-8',
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
