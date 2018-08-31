/* global tw */
import React from 'react'
import { Link } from 'gatsby'
import { css } from 'react-emotion'

import RunningString from './RunningString'
import logo from '../img/logo.svg'

const Navbar = () => (
  <nav
    className={css`
      position: absolute;
      ${tw([
        'bg-white',
        'md:bg-black',
        'overflow-hidden',
        'pin-l',
        'pin-r',
        'pin-t',
        'sticky',
        'z-1000',
      ])};
    `}
  >
    <div
      className={css`
        ${tw([
          'flex',
          'flex-row',
          'justify-center',
          'sm:justify-between',
          'w-full',
        ])};
      `}
    >
      <Link
        to="/"
        className={css`
          ${tw([
            'bg-center',
            'bg-contain',
            'bg-no-repeat',
            'hidden',
            'md:block',
            'mr-q48',
          ])};
          background-image: url(${logo});
          width: 60px;
        `}
      />
      <Link
        to="/"
        className={css`
          ${tw([
            'inline-block',
            'font-extrabold',
            'font-montserrat',
            'px-8',
            'text-black',
            'md:text-white',
            'hover:text-green',
            'text-sm',
            'sm:text-heading5',
          ])};
          letter-spacing: 0.3em;
          line-height: 1.45;
        `}
      >
        ·К·Р·А·П·И·В·А·
      </Link>
      <span
        className={css`
          ${tw([
            'bg-black',
            'md:bg-white',
            'hover:bg-green',
            'cursor-pointer',
            'font-montserrat',
            'font-medium',
            'hidden',
            'sm:inline-flex',
            'items-center',
            'justify-center',
            'px-q24',
            'text-white',
            'md:text-black',
            'hover:text-white',
            'text-md',
            'uppercase',
          ])};
          transition: all 200ms ease-in-out;
        `}
      >
        Подписка
      </span>
    </div>
    <div
      className={css`
        ${tw([
          'font-semibold',
          'font-montserrat',
          'overflow-hidden',
          'text-black',
          'text-center',
          'text-green-dark',
          'text-xs',
          'md:text-md',
          'tracking-wide',
        ])};
        line-height: 2;
        font-variant-caps: all-small-caps;
      `}
    >
      <RunningString string="· культура · ревью · аналитика · петербург · искусство · вовлеченность · активизм " />
    </div>
  </nav>
)

export default Navbar
