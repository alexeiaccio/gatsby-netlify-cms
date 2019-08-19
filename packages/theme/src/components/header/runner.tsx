import * as React from 'react'
import {
  useBoolean,
  useInterval,
  useList,
  useWindowSize,
} from 'react-use'

interface RunnerProps {
  string?: string
  update: boolean
}

function RunnerString({ string = ' Poop', update }: RunnerProps) {
  if (!string) { return null; }
  const stringRef = React.useRef(null)
  const [done, setDone] = useBoolean(false)
  const [baseString] = React.useState(string.split(''))
  const [runner, { set, push }] = useList([baseString[0]])
  const { width } = useWindowSize()
  const [tick, setTick] = React.useState(0)

  useInterval(() => {
    const currentTick = tick % baseString.length
    const prevTick = (tick - 1) % baseString.length

    if (!done && (baseString[prevTick === -1 ? 0 : prevTick] === runner[runner.length - 1])) {
      push(baseString[currentTick])
      setTick(tick + 1)
    }
  }, 16)

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
  }, [runner])

  React.useEffect(() => {
    setDone(false)
  }, [update, stringRef.current, width])

  const keyframe = () => {
    set(runner.slice(1))
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
        {runner.join('')}
      </span>
    )
  }, [update, runner])
}

export const Runner = React.memo(RunnerString)
