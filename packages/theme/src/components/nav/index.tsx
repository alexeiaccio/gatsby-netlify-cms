import * as React from 'react'
import * as uuid from 'uuid/v1'
import { Link } from 'gatsby'
import { navigate } from '@reach/router'

import { Button, ButtonStyles } from '../button/index'

import { itemStyles, navStyles, buttonStyles } from './styles'

interface Item {
  link: string | null
  target?: string
  text: string
}

interface NavProps {
  items?: Item[]
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
  if (!items) { return null }

  return (
    <div css={navStyles}>
      {items.map(({ link, text, target }) => {
        const internal = link && /^\/(?!\/)/.test(link)
        const anchor = link && /^\#/.test(link)
        let component: JSX.Element | string | null = null
        if (internal) {
          component = Link
        } else if (!anchor) {
          component = 'a'
        }

        return (
          <div css={itemStyles} key={uuid()}>
            <Button
              component={component}
              disabled={!link}
              href={!internal && !anchor && link}
              onClick={() => anchor && link && navigate(link)}
              rel={!internal && !anchor && 'noopener noreferrer'}
              styles={buttonStyles}
              target={!internal && !anchor && (target ? target : '_self')}
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