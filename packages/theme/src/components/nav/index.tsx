import * as React from 'react'
import * as uuid from 'uuid/v1'

import { Button, ButtonStyles } from '../button/index'

import { itemStyles, navStyles, buttonStyles } from './styles'

interface Item {
  link: string | null
  text: string
}

interface NavProps {
  items: Item[]
  styles?: ButtonStyles
}

export function Nav({
  items,
  styles = {
    color: '#0cf3ad',
    inverted: true,
    rounded: 0,
    size: 0.75,
  }
}: NavProps) {
  return (
    <div css={navStyles}>
      {items.map(item => {
        return (
          <div css={itemStyles}>
            <Button
              key={uuid()}
              disabled={!item.link}
              styles={buttonStyles}
              {...styles}
            >
              {item.text}
            </Button>
          </div>
        )
      })}
    </div>
  )
}