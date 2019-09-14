import * as React from 'react'
import { useScrolling, useToggle, useThrottle } from 'react-use'
import { css } from '@emotion/core'
import { get } from 'lodash'
import tw from 'tailwind.macro'

import { translite } from '@krapiva-org/utils'

import { Logo } from '../logo/index'
import { Link } from '../link/index'
import { MetaContext } from '../layout/index'

import { HeaderNav } from './nav'
import { Menu } from './menu'
import { Opener } from './opener'
import { Runner } from './runner'
import { Subcribtion } from './subscription'
import { headerStyles, runnerStyles, titleStyles, fadeStyles } from './styles'

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
  const [opened, open] = useToggle(false)
  const [openedForm, toggleForm] = useToggle(false)
  const scrolling = useScrolling(scrollRef)
  const { meta, index } = React.useContext(MetaContext)
  const items = get(index, 'categories', [])
    .map(item => item ? ({ text: item.categorytitle.text, link: translite(item.categorytitle.text) }) : null)

  const handleClick = () => open()

  useThrottle(() => {
    if (scrolling && propsSticked) { open(false) }
  }, 400, [scrolling])

  React.useEffect(() => {
    toggle(propsSticked)
  }, [propsSticked])

  return (
    <React.Fragment>
      <div
        css={fadeStyles}
        hidden={!opened}
        onClick={() => open(false)}
      />
      <div
        css={css`
        ${headerStyles};
        ${(!sticked || opened) && tw`pt-8`};
      `}
      >
        <Link
          css={titleStyles}
          api={meta.special && meta.origin}
          to="/"
        >
          <React.Fragment>
            <Logo height={(sticked && !opened) ? 50 : 100} />
            {(!sticked || opened) && (
              <h1
                css={css`
                ${!sticked && tw`pt-2`};
              `}
              >
                {meta.special || meta.siteTitle}
              </h1>
            )}
          </React.Fragment>
        </Link>
        <HeaderNav
          items={items}
          opened={opened}
          sticked={sticked}
        />
        <Menu
          opened={!sticked || opened}
          toggleForm={toggleForm}
        />
        {!openedForm && (
          <Opener
            onClick={handleClick}
            opened={opened}
            sticked={sticked}
          />
        )}
        <div
          css={css`
          ${runnerStyles};
          ${sticked && tw`text-xxs`};
        `}
        >
          <Runner
            string={meta.siteMotto}
            update={sticked || opened}
          />
        </div>
        <Subcribtion opened={openedForm} onClose={toggleForm} />
      </div>
    </React.Fragment>
  )
}
