import * as React from 'react'
import { useUpdateEffect } from 'react-use'

import { Nav } from '../nav/index'

import { MetaContext } from '../layout/index'
import { navStyles } from './styles'

interface HeaderNavProps {
  items: any[]
  opened: boolean
  sticked: boolean
}

export function HeaderNav({ items, sticked, opened }) {
  const { location } = React.useContext(MetaContext)
  const [visible, setVisible] = React.useState(location.pathname === '/')

  useUpdateEffect(() => {
    setVisible((!sticked && location.pathname === '/') || opened)
  }, [sticked, opened])

  if (!visible) { return null; }

  return (
    <nav css={navStyles}>
      <Nav items={items} />
    </nav>
  )
}