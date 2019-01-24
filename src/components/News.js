import React from 'react'
import { css } from '@emotion/core'
import { withStateHandlers } from 'recompose'

import { Appear } from './Appear'
import { OutlinedTemplate } from './Buttons'

export const News = withStateHandlers(
  { opened: true },
  { close: () => () => ({ opened: false }) }
)(({ close, opened }) => (
  <Appear inProp={opened}>
    <div
      className={css`
        ${tw([
          'bg-green',
          'flex',
          'flex-row',
          'flex-no-wrap',
          'font-montserrat',
          'items-center',
          'justify-between',
          'p-q12',
          'text-white',
          'text-xs',
          'sm:text-sm',
        ])};
      `}
    >
      <div>
        Презентация ·К·Р·А·П·И·В·А· на Новой сцене Александринского театра 4
        октября в 19:00
      </div>
      <div
        className={css`
          ${tw([
            'flex',
            'flex-row',
            'flex-no-wrap',
            'items-center',
            'ml-auto',
          ])};
        `}
      >
        <div
          className={css`
            ${tw(['font-semibold', 'px-q12', 'text-xs'])};
            font-variant: small-caps;
            & *,
            & *:hover {
              ${tw(['text-black'])};
            }
          `}
        >
          <span>{' · '}</span>
          <a
            href="https://www.facebook.com/events/1458310130979414/"
            rel="noopener noreferrer"
            target="_blank"
          >
            FB
          </a>
          <span>{' · '}</span>
          <a
            href="https://vk.com/krapivatoday"
            rel="noopener noreferrer"
            target="_blank"
          >
            VK
          </a>
          <span>{' · '}</span>
        </div>
        <a
          className={css`
            ${OutlinedTemplate};
            ${tw([
              'bg-green',
              'cursor-pointer',
              'hidden',
              'sm:inline-flex',
              'h-q36',
              'mr-q12',
              'px-q12',
              'text-xs',
            ])};
          `}
          href="https://newstage.timepad.ru/event/820826/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Регистрация
        </a>
        <button
          className={css`
            ${OutlinedTemplate};
            ${tw([
              'bg-green',
              'cursor-pointer',
              'h-q36',
              'px-q8',
              'py-0',
              'text-xl',
              'w-q36',
            ])};
          `}
          onClick={close}
        >
          ×
        </button>
      </div>
    </div>
  </Appear>
))
