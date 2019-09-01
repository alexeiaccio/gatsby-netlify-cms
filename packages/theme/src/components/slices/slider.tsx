import * as React from 'react'
import { get } from 'lodash'

import { Img } from '../img/index'
import { SpanHTML } from '../html/index'

import { figureStyles, slideStyles, prevStyles, nextStyles, captionStyles } from './styles'

export function BodySlider({ items }: any) {
  if (!items) { return null }

  const [current, setCurrent] = React.useState(0)

  const caption = get(items, [current, 'slidercaptions', 'html'])
  console.log(caption)
  return (
    <figure css={figureStyles}>
      <div css={slideStyles}>
        <Img src={get(items, [current, 'sliderimage'])} />
        <button
          onClick={() => setCurrent((current - 1) < 0 ? (items.length - 1) : (current - 1))}
          css={prevStyles}
        />
        <button
          onClick={() => setCurrent((current + 1) % items.length)}
          css={nextStyles} />
      </div>
      <figcaption css={captionStyles}>
        <span>{current + 1}</span>
        <span> · </span>
        <span>{items.length}</span>
        <span> </span>
        {caption && (
          <SpanHTML>
            {caption}
          </SpanHTML>
        )}
      </figcaption>
    </figure>
  )
}