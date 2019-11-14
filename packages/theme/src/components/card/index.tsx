import * as React from 'react'
import { get } from 'lodash'
import * as uuid from 'uuid/v1'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import { Article } from '../../typings/article'
import { Event } from '../../typings/event'
import { Place } from '../../typings/place'
import { Img } from '../img/index'
import { Link } from '../link/index'

import { cardStyles, descriptionStyles, imageStyles, imageWrapperStyles, titleStyles } from './styles'

interface CardProps {
  data: Article | Event | Place
  children?: JSX.Element | null
  onClick?: () => void
  renderDescription?: () => JSX.Element | null
}

export function BaseCard({ data, children, renderDescription, onClick }: CardProps) {
  const title = get(data, 'data.title.text', '')
  const image = get(data, 'data.image')
  const regExp = /^https?\:\/\/([a-z0-9._%+-]+)\.cdn.prismic/
  const href = get(data, 'href', '')
  const api = get(regExp.exec(href), '1')

  const renderContent = () => (
    <React.Fragment>
      <div css={imageWrapperStyles}>
        <div css={imageStyles}>
          <Img src={image} />
        </div>
        {children || null}
      </div>
      <h3 css={titleStyles}>{title}</h3>
      <div css={descriptionStyles}>
        {renderDescription && renderDescription()}
      </div>
    </React.Fragment>
  )

  return get(data, 'fields.slug') ? (
    <Link
      css={cardStyles}
      api={api}
      internal={data.internal}
      to={`/${get(data, 'fields.slug')}`}
    >
      {renderContent()}
    </Link>
  ) : (
      <div
        css={css`
          ${cardStyles};
          ${onClick && tw`cursor-pointer`};
        `}
        onClick={onClick}
      >
        {renderContent()}
      </div>
    )
}