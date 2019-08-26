import * as React from 'react'
import { useScrolling, useToggle, useThrottle } from 'react-use'
import { css } from '@emotion/core'
import { get } from 'lodash'
import tw from 'tailwind.macro'

import { translite } from '@krapiva-org/utils/src/make-path'

import { Logo } from '../logo/index'
import { MetaContext } from '../layout/index'

import { HeaderNav } from './nav'
import { Runner } from './runner'
import { headerStyles, runnerStyles, titleStyles } from './styles'

interface HeaderProps {
  sticked: boolean
}

export function Header(props: HeaderProps) {
  const {
    sticked: propsSticked = false,
  } = props
  let rootNode: any = null
  if (typeof document !== 'undefined') {
    rootNode = document
  }
  const scrollRef = React.useRef(rootNode)
  const [sticked, toggle] = useToggle(propsSticked)
  const scrolling = useScrolling(scrollRef)
  const { meta, index } = React.useContext(MetaContext)
  const items = get(index, 'categories', [])
    .map(item => item ? ({ text: item.categorytitle.text, link: translite(item.categorytitle.text) }) : null)

  const handleClick = () => {
    if (sticked) { toggle(false) }
  }

  useThrottle(() => {
    if (scrolling && propsSticked && !sticked) { toggle(true) }
  }, 400, [scrolling])

  React.useEffect(() => {
    toggle(propsSticked)
  }, [propsSticked])

  return (
    <div
      css={css`
        ${headerStyles};
        ${sticked ? tw`cursor-pointer` : tw`pt-8`};
      `}
      onClick={handleClick}
    >
      <Logo height={sticked ? 50 : 100} />
      {!sticked && (
        <React.Fragment>
          <div
            css={css`
              ${titleStyles};
              ${!sticked && tw`pt-2`};
            `}
          >
            {meta.siteTitle}
          </div>
        </React.Fragment>
      )}
      <HeaderNav items={items} sticked={sticked} />
      <div
        css={css`
          ${runnerStyles};
          ${sticked && tw`text-xxs`};
        `}
      >
        <Runner
          string={meta.siteMotto}
          update={sticked}
        />
      </div>
    </div>
  )
}
