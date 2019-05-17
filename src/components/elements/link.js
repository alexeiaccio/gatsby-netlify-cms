import AniLink from 'gatsby-plugin-transition-link/AniLink'
import PropTypes from 'prop-types'
import React from 'react'
import { get } from 'lodash'

function Link({ api, children, location, ...props }) {
  if (!props.to) {
    return null
  }

  const regExp = /^https?\:\/\/([a-z0-9._%+-]+)\./
  const href = get(location, 'href', '')
  const host = get(regExp.exec(href), '1', 'www')

  if (host !== api && !href.includes('localhost')) {
    return (
      <a href={`https://${host}.krapiva.org/${props.to}`} {...props}>
        {children}
      </a>
    )
  }

  return (
    <AniLink hex="#0cf3ad" paintDrip {...props}>
      {children}
    </AniLink>
  )
}

Link.propTypes = {
  api: PropTypes.string,
  css: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  location: PropTypes.shape({
    href: PropTypes.string.isRequired,
  }),
  to: PropTypes.string,
}

Link.defaultProps = {
  api: null,
  css: null,
  children: null,
  to: null,
}

export default Link
