import React from 'react'

/**
 *
 * @param {{children: JSX.Element}} Nodes
 */

function Layout({ children }) {
  return (
    <div>
      <h1>Hello!</h1>
      {children}
    </div>
  )
}

export default Layout
