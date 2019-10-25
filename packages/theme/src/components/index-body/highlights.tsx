import * as React from 'react'
import { get } from 'lodash'
import { useUpdateEffect } from 'react-use'
import { Link as GatsbyLink } from 'gatsby'

import { HTML } from '../html/index'
import { TextContainer } from '../main/index'
import { Img } from '../img/index'
import { MetaContext } from '../layout/index'
import { highlightStyles, highlightWrapperStyles, highlightTextStyles } from './styles'

function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export function Highlights({ highlights }) {
  if (!highlights) return null

  const [current, setCurrent] = React.useState(getRandom(highlights.length))

  const { location } = React.useContext(MetaContext)
  useUpdateEffect(() => {
    setCurrent(getRandom(highlights.length))
  }, [location.pathname])

  const image = get(highlights, [current, 'primary', 'image'])
  const text = get(highlights, [current, 'primary', 'text', 'html'])
  const link = get(highlights, [current, 'primary', 'link'])
  const internal = link && /^\/(?!\/)/.test(link)
  let Component = 'div'

  if (internal) {
    Component = GatsbyLink
  } else if (link) {
    Component = 'a'
  }

  return (
    <Component
      css={highlightStyles}
      href={!internal && get(link, 'url')}
      target={get(link, 'target')}
      {...(internal && { to: get(link, 'url') })}
      {...(internal && { internal })}
    >
      <div css={highlightWrapperStyles}>
        {image && <Img src={image} />}
        {text && (
          <div css={highlightTextStyles}>
            <TextContainer>
              <HTML>{text}</HTML>
            </TextContainer>
          </div>
        )}
      </div>
    </Component>
  )
}