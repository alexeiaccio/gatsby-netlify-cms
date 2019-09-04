import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import { useDebounce } from 'react-use'

import { Dummy } from './dummy'
import { Header } from './header'
import { Wrapper } from './wrapper'

export function WrappedHeader() {
  const headerRef = React.useRef(null)
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [ref, inView] = useInView({
    threshold: 1,
  })

  useDebounce(() => {
    if (headerRef && headerRef.current) {
      const newHeaderHeight = headerRef.current.getBoundingClientRect().height;
      if (newHeaderHeight > headerHeight) {
        setHeaderHeight(newHeaderHeight)
      }
    }
  }, 200, [inView])

  const sticked = headerRef.current ? !inView : false

  return (
    <React.Fragment>
      <Wrapper ref={headerRef} sticked={sticked}>
        <Header sticked={sticked} />
      </Wrapper>
      <Dummy height={headerHeight} ref={ref} />
    </React.Fragment>
  )
}