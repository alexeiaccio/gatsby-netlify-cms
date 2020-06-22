import * as React from 'react'
import { get } from 'lodash'

import { translite } from '@krapiva-org/utils'

import { MetaContext } from '../layout/index'

// import { FooterBunners } from './bunners'
import { FooterNav } from './nav'
import { footerStyles, rowStyles, blockStyles, publicStyles, linkStyles } from './styles'

export function Footer() {
  const { index } = React.useContext(MetaContext)
  const items = get(index, 'categories', [])
    .map(item => item ? ({
      text: item.categorytitle.text,
      link: `/${translite(item.categorytitle.text)}`,
    }) : null)

  return (
    <React.Fragment>
      {/* <FooterBunners /> */}
      <footer css={footerStyles}>
        <FooterNav items={items} />
        <div css={rowStyles}>
          <div css={blockStyles}>
            <span>·К·Р·А·П·И·В·А·</span>
            <span
              css={publicStyles}
              title="Общественное достояние"
            />
            <span>2018—{new Date(Date.now()).getFullYear()}</span>
          </div>
          <div css={blockStyles}>
            <a
              css={linkStyles}
              href="https://money.yandex.ru/to/410012396039377"
              rel="noopener noreferrer"
              target="_blank"
            >
              ПОДДЕРЖАТЬ
          </a>
            <span>{' · '}</span>
            <a
              css={linkStyles}
              href="mailto:krapiva@krapiva.org"
              rel="noopener noreferrer"
              target="_blank"
            >
              MAIL
          </a>
            <span>{' · '}</span>
            <a
              css={linkStyles}
              href="https://www.facebook.com/krapivapiter"
              rel="noopener noreferrer"
              target="_blank"
            >
              FB
          </a>
            <span>{' · '}</span>
            <a
              css={linkStyles}
              href="https://vk.com/krapiva_piter"
              rel="noopener noreferrer"
              target="_blank"
            >
              VK
          </a>
          </div>
        </div>
        <div css={rowStyles}>
          <div css={blockStyles}>
            <span> Разработка </span>
            <a
              css={linkStyles}
              href="https://beta.accio.pro"
              rel="noopener noreferrer"
              target="_blank"
            >
              accio
            </a>
          </div>
        </div>
      </footer>
    </React.Fragment>
  )
}
