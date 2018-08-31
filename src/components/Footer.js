/* global tw */
import React from 'react'
//import { Link } from 'gatsby'
import { css } from 'react-emotion'

import publicdomain from '../img/publicdomain.svg'
import publicdomainBlack from '../img/publicdomain-black.svg'

export const Footer = () => (
  <footer
    className={css`
      ${tw([
        'bg-white',
        'md:bg-black',
        'py-q24',
        'md:py-q36',
        'relative',
        'text-balck',
        'md:text-white',
        'w-fill',
        'z-1000',
      ])};
    `}
  >
    <div
      className={css`
        ${tw([
          'flex',
          'flex-row',
          'font-montserrat',
          'max-w-md',
          'mx-auto',
          'px-q24',
          'md:px-q48',
          'text-xs',
        ])};
      `}
    >
      <div
        className={css`
          ${tw(['bg-contain', 'bg-no-repeat', 'pl-q24'])};
          @media (max-width: 768px) {
            background-image: url(${publicdomainBlack});
          }
          background-image: url(${publicdomain});
        `}
      >
        ·К·Р·А·П·И·В·А·
      </div>
      <div
        className={css`
          ${tw(['ml-auto'])};
        `}
      >
        2018
      </div>
    </div>
  </footer>
)
