import * as React from 'react'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import { useWindowSize, useInterval } from 'react-use'

interface RunnerProps {
  string: string
}

export function Runner(props: RunnerProps) {
  const stringRef = React.useRef(null)
  let i = React.useRef(0).current
  const [baseString] = React.useState(props.string.split(''))
  const [string, setString] = React.useState(baseString.join(''))
  const { width, height } = useWindowSize()

  const getString = () => {
    if (stringRef.current) {
      const stringTag = stringRef.current
      const stringWidth = stringTag.getBoundingClientRect().width
      const parentWidth = stringTag.parentNode.getBoundingClientRect().width
      if (stringWidth < parentWidth) {
        stringTag.innerText += baseString[
          i % baseString.length
        ]
        i += 1
        getString()
      }
    }
  }

  React.useEffect(() => {
    setString(getString())
  }, [stringRef.current, width, height])

  const keyframe = () => {
    if (stringRef.current) {
      const stringTag = stringRef.current
      const newStringInnerText = stringTag.innerText
        .split('')
        .slice(1)
        .concat(baseString[i % baseString.length])
      stringTag.innerText = newStringInnerText.join('')
      i += 1
    }
  }

  useInterval(() => {
    keyframe()
  }, 400);

  return <span css={css`${tw`whitespace-no-wrap`};`} ref={stringRef}>{string}</span>
}