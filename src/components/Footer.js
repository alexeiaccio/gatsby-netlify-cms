/* global tw */
import React from 'react'
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
          'flex-col',
          'sm:flex-row',
          'font-montserrat',
          'items-center',
          'justify-between',
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
          ${tw(['flex', 'items-center'])};
        `}
      >
        <span>2018</span>
        <span
          className={css`
            ${tw([
              'bg-contain',
              'bg-no-repeat',
              'h-q16',
              'inline-block',
              'mx-q12',
              'w-q16',
            ])};
            @media (max-width: 768px) {
              background-image: url(${publicdomainBlack});
            }
            background-image: url(${publicdomain});
          `}
        />
        <span>·К·Р·А·П·И·В·А·</span>
      </div>
      <a
        className={css`
          ${tw([
            'bg-green',
            'hover:bg-black',
            'md:hover:bg-white',
            'border-none',
            'font-montserrat',
            'font-medium',
            'inline-flex',
            'items-center',
            'justify-center',
            'mx-q4',
            'my-q24',
            'sm:my-0',
            'outline-none',
            'px-q24',
            'py-q12',
            'rounded-lg',
            'text-black',
            'hover:text-green',
            'md:hover:text-black',
            'text-md',
            'uppercase',
          ])};
        `}
        href="https://yasobe.ru/na/krapiva"
        rel="noopener noreferrer"
        target="_blank"
      >
        Поддержать
      </a>
      <div
        className={css`
          ${tw(['flex', 'flex-no-wrap'])};
        `}
      >
        <span
          className={css`
            ${tw(['mr-q8'])};
          `}
        >
          Разработка
        </span>
        <a
          className={css`
            ${tw(['font-semibold'])};
            font-variant: small-caps;
          `}
          href="https://beta.accio.pro"
          rel="noopener noreferrer"
          target="_blank"
        >
          accio
        </a>
      </div>
    </div>
  </footer>
)
