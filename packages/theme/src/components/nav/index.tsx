import * as React from 'react'
import * as uuid from 'uuid/v1'
import { Link } from 'gatsby'
import { navigate } from '@reach/router'

import { StyledButton, ButtonStyles } from '../button/index'

import { itemStyles, navStyles, buttonStyles } from './styles'

interface Item {
  link: string | null
  target?: string
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
      {items.map(({ link, text, target }) => {
        const internal = link && /^\/(?!\/)/.test(link)
        const anchor = link && /^\#/.test(link)
        let Button = StyledButton
        if (internal) {
          Button = StyledButton.withComponent(Link)
        } else if (!anchor) {
          Button = StyledButton.withComponent('a')
        }

        return (
          <div css={itemStyles}>
            <Button
              key={uuid()}
              disabled={!link}
              href={!internal && !anchor && link}
              onClick={() => anchor && link && navigate(link)}
              rel={!internal && !anchor && 'noopener noreferrer'}
              styles={buttonStyles}
              target={!internal && !anchor && (target || '_self')}
              to={internal && link}
              {...styles}
            >
              {text}
            </Button>
          </div>
        )
      })}
    </div>
  )
}