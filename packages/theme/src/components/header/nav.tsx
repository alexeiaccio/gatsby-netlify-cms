import * as React from 'react'
import { useUpdateEffect } from 'react-use'

import { Nav } from '../nav/index'

import { MetaContext } from '../layout/index'
import { navStyles } from './styles'

interface HeaderNavProps {
  items: any[]
  opened?: boolean
  sticked?: boolean
}

export function HeaderNav({ items, sticked = false, opened = false }: HeaderNavProps) {
  const { location, pagesIndex } = React.useContext(MetaContext)
  const isNotSticked = (!pagesIndex && (location.pathname === '/') && !sticked)
  const [visible, setVisible] = React.useState(isNotSticked)

  useUpdateEffect(() => {
    setVisible(isNotSticked || opened)
  }, [sticked, opened])

  if (!visible) { return null; }

  return (
    <nav css={navStyles}>
      <Nav items={items} />
    </nav>
  )
}