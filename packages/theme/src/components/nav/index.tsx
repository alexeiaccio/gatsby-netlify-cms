import * as React from 'react'
import * as uuid from 'uuid/v1'
import { navigate } from '@reach/router'

import { MENU } from '@krapiva-org/utils'

import { Link } from '../link/index'
import { LinkButton } from '../button/link'
import { ButtonStyles } from '../button/index'
import { MetaContext } from '../layout/index'

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
  items = [],
  styles = {
    color: '#0cf3ad',
    inverted: true,
    contrast: true,
    rounded: 0,
    size: 0.75,
  }
}: NavProps) {
  let menuItems = [...MENU.before, ...items, ...MENU.after]
  const { location } = React.useContext(MetaContext)

  if (location.pathname === '/') {
    menuItems = menuItems.map(item => ({
      ...item,
      link: item.link && `#${item.link}`
    }))
  }

  return (
    <ul css={navStyles}>
      {menuItems.map(({ link, text, target }) => {
        const internal = link && /^\/(?!\/)/.test(link)
        const anchor = link && /^\#/.test(link)
        let component: JSX.Element | string | null = null
        if (internal) {
          component = Link
        } else if (!anchor) {
          component = 'a'
        }

        return (
          <li css={itemStyles} key={uuid()}>
            <LinkButton
              component={component}
              disabled={!link}
              href={!internal && !anchor && link}
              onClick={() => anchor && link && navigate(link, { replace: true })}
              rel={!(internal || anchor) ? 'noopener noreferrer' : undefined}
              styles={buttonStyles}
              target={!internal && !anchor && (target ? target : '_self')}
              to={internal && link}
              {...styles}
            >
              {text}
            </LinkButton>
          </li>
        )
      })}
    </ul>
  )
}