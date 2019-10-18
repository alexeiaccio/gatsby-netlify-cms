import * as React from 'react'
import { useScrolling, useToggle, useThrottle } from 'react-use'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import { Logo } from '../logo/index'
import { Link } from '../link/index'

import { DarkModeToggle } from './dark-mode-toggle'
import { HeaderProps } from './index'
import { HeaderNav } from './nav'
import { Menu } from './menu'
import { Opener } from './opener'
import { Runner } from './runner'
import { Subcribtion } from './subscription'
import { useOpen } from './use-open'
import { headerStyles, runnerStyles, titleStyles, stickedStyles, fadeStyles, themeToggle } from './styles'

interface Props extends HeaderProps {
  sticked: boolean
}

export function StickedHeader(props: Props) {
  const {
    openedForm,
    toggleForm,
    meta,
    items,
    sticked: propsSticked = false,
  } = props

  const { sticked, opened, toggle, open, handleClick } = useOpen(propsSticked)

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
        ${stickedStyles};
        ${opened && tw`pt-8`};
        transform: ${sticked && 'translateY(0%)'};
      `}
      >
        <Link
          css={titleStyles}
          api={process.env.SPECIAL ? process.env.PRISMIC_API : undefined}
          to="/"
        >
          <React.Fragment>
            <Logo height={opened ? 100 : 50} />
            {opened && (
              <h1 css={css`${opened && tw`pt-2`}`}>
                {process.env.SPECIAL || meta.siteTitle}
              </h1>
            )}
          </React.Fragment>
        </Link>
        <HeaderNav
          items={items}
          opened={opened}
          sticked
        />
        <Menu
          opened={opened}
          toggleForm={toggleForm}
        />
        {!openedForm && (
          <Opener
            onClick={handleClick}
            opened={opened}
            sticked
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
        {opened && (
          <div css={themeToggle}>
            <DarkModeToggle />
          </div>
        )}
      </div>
    </React.Fragment>
      )
    }
