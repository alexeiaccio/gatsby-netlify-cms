import * as React from 'react'
import * as uuid from 'uuid/v1'
import { get } from 'lodash'

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
  const { location, pagesIndex, meta } = React.useContext(MetaContext)
  const href = get(location, 'href', '')
  const toMainSite = pagesIndex ? [{
    text: meta.siteTitle,
    link: href.includes('localhost:') ? '/' : meta.siteUrl,
  }] : []
  let menuItems = [...toMainSite, ...MENU.before, ...items, ...MENU.after]

  if (!href.includes('localhost:')) {
    if (process.env.PRISMIC_API === 'krapiva-dev') {
      menuItems = menuItems.map(item => ({
        ...item,
        link: item.link && `https://dev-main.krapiva.org${item.link}`
      }))
    } else if (process.env.PRISMIC_API !== 'www') {
      menuItems = menuItems.map(item => ({
        ...item,
        link: item.link && `https://www.krapiva.org${item.link}`
      }))
    }
  }

  return (
    <ul css={navStyles}>
      {menuItems.map(({ link, text, target }) => {
        const internal = link && /^\/(?!\/)/.test(link)
        let component: JSX.Element | string | null = 'a'

        if (internal) {
          component = Link
        }

        return (
          <li css={itemStyles} key={uuid()}>
            <LinkButton
              component={component}
              disabled={!link}
              href={!internal && link}
              rel={!internal ? 'noopener noreferrer' : undefined}
              styles={buttonStyles}
              target={!internal && (target ? target : '_self')}
              to={internal && link}
              {...styles}
              {...{internal}}
            >
              {text}
            </LinkButton>
          </li>
        )
      })}
    </ul>
  )
}