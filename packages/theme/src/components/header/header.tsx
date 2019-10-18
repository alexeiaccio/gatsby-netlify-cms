import * as React from 'react'
import { css } from '@emotion/core'
import OnIdle from '@modus/react-idle'
import tw from 'tailwind.macro'

import { Logo } from '../logo/index'
import { Link } from '../link/index'

import { DarkModeToggle } from './dark-mode-toggle'
import { Dummy } from './dummy'
import { HeaderProps } from './index'
import { HeaderNav } from './nav'
import { Menu } from './menu'
import { Opener } from './opener'
import { Runner } from './runner'
import { Subcribtion } from './subscription'
import { useOpen } from './use-open'
import { headerStyles, runnerStyles, titleStyles, themeToggle } from './styles'

export function Header(props: HeaderProps) {
  const {
    openedForm,
    toggleForm,
    meta,
    items,
  } = props
  const { sticked, opened, handleClick } = useOpen(false)

  return (
    <div
      css={css`
      ${headerStyles};
      ${tw`pt-8`};
      z-index: 51;
    `}
    >
      <Link
        css={titleStyles}
        api={process.env.SPECIAL ? process.env.PRISMIC_API : undefined}
        to="/"
      >
        <React.Fragment>
          <Logo height={100} />
          <h1 css={css`${tw`pt-2`}`}>
            {process.env.SPECIAL || meta.siteTitle}
          </h1>
        </React.Fragment>
      </Link>
      <HeaderNav
        items={items}
        opened={opened}
      />
      <Menu
        opened
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
        ${tw`h-5`};
      `}
      >
        <OnIdle skipSSR placeholder={<Dummy />}>
          <Runner
            string={meta.siteMotto}
          />
        </OnIdle>
      </div>
      <Subcribtion opened={openedForm} onClose={toggleForm} />
      <div css={themeToggle}>
        <DarkModeToggle />
      </div>
    </div>
  )
}
