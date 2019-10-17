import * as React from 'react'
import * as uuid from 'uuid/v1'
import { css } from '@emotion/core'
import { concat, find, filter } from 'lodash'
import { usePrevious, useToggle, useUpdateEffect } from 'react-use'
import tw from 'tailwind.macro'

import { listStyles, itemStyles, linkStyles } from './styles'

type Props = Readonly<{
  collapsed: boolean
  items: Array<{
    name: string
    active: boolean
    toggle?: () => void
  }>
  onClick: (name: string | null) => void
}>

export function Filters({ collapsed, items, onClick }: Props): JSX.Element | null {
  if (items.length === 0) return null

  const [opened, toggle] = useToggle(false)
  const prevOpened = usePrevious(opened)
  const [filters, setFilters] = React.useState<any[]>([])
  const active = find(items, ['active', true])
  
  React.useEffect(() => {
    const notActive = filter(items, ['active', false])
    const newFilters = [
      ...(opened ? items : notActive.slice(0, 4)),
      { name: opened ? 'Закрыть ↑' : 'Ещё ↓', active: false, toggle }
    ]

    if (active) {
      if (prevOpened) {
        toggle(false)
      }

      if (opened) {
        setFilters(newFilters)
      } else {
        setFilters(concat(active, newFilters))
      }
    } else {
      setFilters(newFilters)
    }
  }, [active, opened])

  useUpdateEffect(() => {
    toggle(false)
  }, [collapsed])

  return (
    <ul css={listStyles}>
      <li
        css={css`
          ${itemStyles};
          flex-grow: 0;
        `}
        key={uuid()}
      >
        <span
          css={css`
            ${linkStyles};
            background-color: var(--bg-color);
          `}
        >
          {'Фильтры:'}
        </span>
      </li>
      {filters.map(({ name, active, ...args }) => (
        <li css={itemStyles} key={uuid()}>
          <button
            css={css`
              ${linkStyles};
              ${active && tw`bg-green-500 text-black z-10`};
              ${args.toggle && 'background-color: var(--gray-light-color)'};
              &:hover:after {
                ${linkStyles};
                ${tw`absolute bg-green-500 hidden inset-0 left-auto`};
                ${active && tw`block`};
                content: '☒';
                transform: translateX(100%);
              }
            `}
            onClick={args.toggle ? args.toggle : (() => onClick(active ? null : name))}
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  )
}
