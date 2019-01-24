import React from 'react'
import { css } from '@emotion/core'

import Link from '../elements/link'

function Header() {
  return (
    <header
      css={css`
        ${tw([
          'bg-black',
          'fixed',
          'overflow-hidden',
          'pin-l',
          'pin-r',
          'pin-t',
          'z-1001',
        ])};
      `}
    >
      <nav
        css={css`
          ${tw([
            'flex',
            'flex-row',
            'justify-center',
            'w-full',
            'sm:justify-between',
          ])};
        `}
      >
        <Link
          css={css`
            ${tw([
              'inline-block',
              'font-extrabold',
              'font-montserrat',
              'mx-auto',
              'px-q12',
              'pt-q8',
              'sm:pt-0',
              'text-white',
              'hover:text-green',
              'text-mobile',
              'sm:text-heading5',
            ])};
            letter-spacing: 0.3em;
            line-height: 1.45;
          `}
          to="/"
        >
          ·К·Р·А·П·И·В·А·
        </Link>
      </nav>
    </header>
  )
}

export default Header
