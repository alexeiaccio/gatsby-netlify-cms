import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import { useToggle } from 'react-use'
import { get } from 'lodash'
import OnIdle from '@modus/react-idle'

import { translite } from '@krapiva-org/utils'

import { Border } from '../layout/styles'
import { MetaContext } from '../layout/index'
import { Meta } from '../../typings/meta'

import { Header } from './header'
import { StickedHeader } from './sticked-header'
import { Wrapper } from './wrapper'

export type HeaderProps = Readonly<{
  openedForm: boolean
  toggleForm: () => void
  meta: Meta
  items: Array<{
    text: string
    link: string
  }>
}>

export function WrappedHeader() {
  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: '100px',
  })

  async function loadPolyfills() {
    if (window !== undefined && typeof window.IntersectionObserver === 'undefined') {
      await import('intersection-observer')
    }
  }

  React.useEffect(() => {
    loadPolyfills();
  }, [])

  const [openedForm, toggleForm] = useToggle(false)
  const { meta, index } = React.useContext(MetaContext)
  const items = get(index, 'categories', [])
    .map(item => item ? ({
      text: item.categorytitle.text,
      link: `/${translite(item.categorytitle.text)}`,
    }) : null)

  return (
    <React.Fragment>
      <Wrapper ref={ref}>
        <Header
          openedForm={openedForm}
          toggleForm={toggleForm}
          meta={meta}
          items={items}
        />
      </Wrapper>
      <OnIdle skipSSR placeholder={<Border side="top" />}>
        <StickedHeader
          openedForm={openedForm}
          toggleForm={toggleForm}
          meta={meta}
          items={items}
          sticked={!inView}
        />
      </OnIdle>
    </React.Fragment>
  )
}