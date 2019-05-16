import React from 'react'

import { Location } from '@reach/router'

function withLocation(WrappedComponent) {
  return function(...args) {
    return (
      <Location>
        {({ location }) => <WrappedComponent location={location} props={args} />}
      </Location>
    )
  }
}

export default withLocation
