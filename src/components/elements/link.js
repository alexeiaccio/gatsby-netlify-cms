import AniLink from 'gatsby-plugin-transition-link/AniLink'
import PropTypes from 'prop-types'
import React from 'react'
import { get } from 'lodash'

function Link({ api, children, location, ...props }) {
  if (!props.to) {
    return null
  }

  const regExp = /^https?\:\/\/([a-z0-9._%+-]+)\./
  const origin = get(location, 'origin', '')
  const host = get(regExp.exec(host), '1', 'www')
  
  if (host !== api) {
    const path = origin.includes('localhost') ?
      `${origin}/${props.to}`
      :
      `https://${host}.krapiva.org/${props.to}`

    return (
      <a href={path} {...props}>
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
    origin: PropTypes.string.isRequired,
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
