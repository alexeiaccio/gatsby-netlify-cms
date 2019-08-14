import * as React from 'react'
import { useInView } from 'react-intersection-observer'

import { Dummy } from './dummy'
import { Header } from './header'
import { Wrapper } from './wrapper'

export function WrappedHeader() {
  const headerRef = React.useRef(null)
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [ref, inView] = useInView({
    rootMargin: `${headerHeight}px`,
    threshold: 1,
  })

  React.useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.getBoundingClientRect().height);
    }
  }, [inView])

  return (
    <React.Fragment>
      <Wrapper ref={headerRef} sticked={!inView}>
        <Header sticked={!inView} />
      </Wrapper>
      <Dummy height={headerHeight} ref={ref}/>
    </React.Fragment>
  )
}