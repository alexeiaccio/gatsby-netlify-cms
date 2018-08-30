/* global tw */
import React from 'react'
import { Link } from 'gatsby'
import { css } from 'react-emotion'
import { uuid } from '../utils'

import RunningString from './RunningString'

const Navbar = () => (
  <nav
    className={css`
      ${tw(['bg-white', 'md:bg-black', 'pin-t', 'sticky', 'z-1000'])};
    `}
  >
    <div
      className={css`
        ${tw([
          'font-semibold',
          'font-montserrat',
          'overflow-hidden',
          'text-black',
          'text-center',
          'text-green-dark',
          'text-xxs',
          'tracking-wide',
        ])};
        line-height: 0.8;
        font-variant-caps: all-small-caps;
      `}
    >
      <RunningString string="· культура · ревью · аналитика · петербург · искусство · вовлеченность · активизм " />
    </div>
    <div>
      <Link
        to="/"
        className={css`
          ${tw([
            'flex',
            'font-extrabold',
            'font-montserrat',
            'justify-between',
            'px-8',
            'text-black',
            'md:text-white',
            'text-xs',
            'md:text-body',
            'w-full',
          ])};
          letter-spacing: 1em;
          line-height: 0.75;
        `}
      >
        {`·К·Р·А·П·И·В·А·`.split('').map(char => (
          <span key={uuid()}>{char}</span>
        ))}
      </Link>
    </div>
  </nav>
)

export default Navbar
