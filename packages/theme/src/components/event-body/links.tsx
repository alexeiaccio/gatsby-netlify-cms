import * as React from 'react'
import * as uuid from 'uuid/v1'
import { get } from 'lodash'

import { Link } from '../../typings/event'

import { listStyles, itemStyles, linkStyles } from './styles'

type Props = Readonly<{
  items: Array<Link>
}>

export function Links({ items }: Props): JSX.Element | null {
  if (!get(items, '0.link.url')) return null

  return (
    <ul css={listStyles}>
      {items.map(({ link }) => (
        <li css={itemStyles} key={uuid()}>
          <a
            css={linkStyles}
            href={get(link, 'url', '')}
            rel="noopener noreferrer"
            target="_blank"
          >
            {get(link.url && link.url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?(.+)\..+\/?/i), [1]) || 'Ссылка'}
          </a>
        </li>
      ))}
    </ul>
  )
}
