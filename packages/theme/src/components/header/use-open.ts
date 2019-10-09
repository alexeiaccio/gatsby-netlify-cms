import { useRef } from 'react'
import { useScrolling, useToggle, useThrottle } from 'react-use'

export function useOpen(propsSticked: boolean) {
  let rootNode: any = null
  if (typeof document !== 'undefined') {
    rootNode = document
  }
  const scrollRef = useRef(rootNode)
  const [sticked, toggle] = useToggle(propsSticked)
  const [opened, open] = useToggle(false)
  const scrolling = useScrolling(scrollRef)

  useThrottle(
    () => {
      if (scrolling && propsSticked) {
        open(false)
      }
    },
    400,
    [scrolling]
  )

  const handleClick = () => open()

  return { sticked, opened, toggle, open, handleClick }
}
