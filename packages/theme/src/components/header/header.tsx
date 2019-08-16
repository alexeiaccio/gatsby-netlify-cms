import * as React from 'react'
import { useScrolling, useToggle, useThrottle } from 'react-use'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import { Logo } from '../logo/index'
import { Nav } from '../nav/index'
import { items } from '../../../docs/__mocks__/nav'
import { MetaContext } from '../layout/index'

import { Runner } from './runner'
import { headerStyles, navStyles, runnerStyles, titleStyles } from './styles'

interface HeaderProps {
  sticked: boolean
}

export function Header(props: HeaderProps) {
  let rootNode: any = null
  if (typeof document !== 'undefined') {
    rootNode = document
  }
  const scrollRef = React.useRef(rootNode);
  const [sticked, toggle] = useToggle(props.sticked)
  const scrolling = useScrolling(scrollRef);
  const { meta } = React.useContext(MetaContext)

  const handleClick = () => {
    if (sticked) { toggle(false) }
  }

  useThrottle(() => {
    if (scrolling && props.sticked && !sticked) { toggle(true) }
  }, 400, [scrolling])

  React.useEffect(() => {
    toggle(props.sticked)
  }, [props.sticked])

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
            {meta.title}
          </div>
          <div css={navStyles}>
            <Nav items={items} />
          </div>
        </React.Fragment>
      )}
      <div
        css={css`
          ${runnerStyles};
          ${sticked && tw`text-xxs`};
        `}
      >
        <Runner
          string={meta.motto}
          update={sticked}
        />
      </div>
    </div>
  )
}
