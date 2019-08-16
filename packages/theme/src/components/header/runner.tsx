import * as React from 'react'
import {
  useBoolean,
  useInterval,
  useList,
  useRafLoop,
  useWindowSize,
} from 'react-use'

interface RunnerProps {
  string: string
  update: boolean
}

function RunnerString(props: RunnerProps) {
  const stringRef = React.useRef(null)
  const [done, setDone] = useBoolean(false)
  const [baseString] = React.useState(props.string.split(''))
  const [string, { set, push }] = useList([' '])
  const { width } = useWindowSize()
  const [tick, setTick] = React.useState(0)

  useInterval(() => {
    if (!done) {
      push(baseString[tick % baseString.length])
      setTick(tick + 1)
    }
  }, 20)

  React.useEffect(() => {
    const stringTag = stringRef.current
    if (stringTag) {
      const stringWidth = stringTag.getBoundingClientRect().width
      const parentWidth = stringTag.parentNode.getBoundingClientRect().width

      if (stringWidth >= parentWidth) {
        stop()
        setDone(true)
      }
    }
  }, [string])

  React.useEffect(() => {
    set([' '])
    setDone(false)
  }, [props.update, stringRef.current, width])

  const keyframe = () => {
    set(string.slice(1))
    push(baseString[tick % baseString.length])
    setTick(tick + 1)
  }

  useInterval(() => {
    if (done) {
      keyframe()
    }
  }, 500);

  return React.useMemo(() => {
    return (
      <span ref={stringRef}>
        {string.join('')}
      </span>
    )
  }, [props.update, string])
}

export const Runner = React.memo(RunnerString)
