import * as React from 'react'

import { menuStyles, linkStyles } from './styles'
import { Link } from '../link/index'

interface MenuProps {
  opened: boolean
  toggleForm: () => void
}

export function Menu({ opened, toggleForm }: MenuProps) {
  if (!opened) { return null }

  return (
    <React.Fragment>
      <menu css={menuStyles}>
        <button css={linkStyles} onClick={toggleForm}>
          ПОДПИСАТЬСЯ
        </button>
        <a
          css={linkStyles}
          href="https://money.yandex.ru/to/410012396039377"
          rel="noopener noreferrer"
          target="_blank"
        >
          ПОДДЕРЖАТЬ
        </a>
        <a
          css={linkStyles}
          href="https://www.facebook.com/krapivapiter"
          rel="noopener noreferrer"
          target="_blank"
        >
          FB
        </a>
        <a
          css={linkStyles}
          href="https://vk.com/krapiva_piter"
          rel="noopener noreferrer"
          target="_blank"
        >
          VK
        </a>
        <Link
          api={
            process.env.PRISMIC_API && process.env.PRISMIC_API.includes('dev') ?
              process.env.PRISMIC_API : 'www'
          }
          css={linkStyles}
          to="/poisk"
        >
          ПОИСК
        </Link>
      </menu>
    </React.Fragment>
  )
}