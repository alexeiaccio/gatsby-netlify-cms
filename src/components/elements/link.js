import React from 'react'
import PropTypes from 'prop-types'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

export default function Link({ children, ...props }) {
  return (
    <AniLink hex="#0cf3ad" paintDrip {...props}>
      {children}
    </AniLink>
  )
}

Link.propTypes = {
  children: PropTypes.object,
}
