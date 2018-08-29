/* global tw */
import React from 'react'
import { Link } from 'gatsby'
import { css } from 'react-emotion'

const Navbar = () => (
  <nav
    className={css`
      ${tw(['pin-t', 'sticky', 'z-1000'])};
    `}
  >
    <div
      className={css`
        ${tw(['bg-black', 'flex', 'flex-col', 'items-center'])};
      `}
    >
      <div
        className={css`
          ${tw(['font-extrabold', 'font-montserrat'])};
          letter-spacing: 1em;
          line-height: 0.75;
        `}
      >
        <Link
          to="/"
          className={css`
            ${tw(['text-white'])};
          `}
        >
          ·К·Р·А·П·И·В·А·
        </Link>
      </div>
    </div>
    <div
      className={css`
        ${tw([
          'bg-white',
          'font-montserrat',
          'pb-2',
          'text-black',
          'text-center',
          'text-xs',
          'tracking-wide',
        ])};
        line-height: 0.35;
        font-variant-caps: all-small-caps;
      `}
    >
      ·&ensp;культура&ensp;·&ensp;ревью&ensp;·&ensp;аналитика&ensp;·&ensp;петербург&ensp;·&ensp;искусство&ensp;·&ensp;вовлеченность&ensp;·&ensp;активизм&ensp;·
    </div>
  </nav>
)

export default Navbar
