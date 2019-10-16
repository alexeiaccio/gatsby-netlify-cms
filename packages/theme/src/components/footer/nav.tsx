import * as React from 'react'

import { Nav } from '../nav/index'

import { navStyles } from './styles'

interface FooterNavProps {
  items: any[]
}

export function FooterNav({ items }: FooterNavProps) {

  const styles = {
    color: '#000',
    inverted: true,
    contrast: false,
    rounded: 0,
    size: 0.5,
  }

  return (
    <nav css={navStyles}>
      <Nav items={items} styles={styles} />
    </nav>
  )
}