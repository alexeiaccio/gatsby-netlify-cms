import * as React from 'react'
import * as uuid from 'uuid/v1'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import { listStyles, itemStyles, linkStyles } from './styles'

type Props = Readonly<{
  items: Array<{
    name: string
    active: boolean
  }>
  onClick: (name: string | null) => void
}>

export function Filters({ items, onClick }: Props): JSX.Element | null {
  if (items.length === 0) return null

  return (
    <ul css={listStyles}>
      {items.map(({ name, active }) => (
        <li css={itemStyles} key={uuid()}>
          <button
            css={css`
              ${linkStyles};
              ${active && tw`bg-green-500 z-10`};
              transform: scale(${active ? 1.2 : 1});
              &:hover:after {
                ${linkStyles};
                ${tw`absolute bg-green-500 hidden inset-0 left-auto`};
                ${active && tw`block`};
                content: '☒';
                transform: translateX(100%);
              }
            `}
            onClick={() => onClick(active ? null : name)}
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  )
}
